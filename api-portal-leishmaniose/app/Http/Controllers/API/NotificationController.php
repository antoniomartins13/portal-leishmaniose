<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\NotificationStoreRequest;
use App\Mail\NotificationConfirmationMail;
use App\Mail\NotificationStatusChangedMail;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf;
use Symfony\Component\HttpFoundation\StreamedResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *   name="Notificacoes",
 *   description="Casos de leishmaniose"
 * )
 */
class NotificationController extends BaseController
{
    /**
     * Cria uma nova notificação de caso.
     * Esta rota é pública - não precisa de autenticação.
        *
        * @OA\Post(
        *   path="/api/notifications",
        *   tags={"Notificacoes"},
        *   summary="Registrar notificacao",
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/NotificationCreateRequest")
        *   ),
        *   @OA\Response(
        *     response=201,
        *     description="Notificacao criada",
        *     @OA\JsonContent(ref="#/components/schemas/NotificationCreatedResponse")
        *   ),
        *   @OA\Response(
        *     response=500,
        *     description="Erro ao registrar",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function store(NotificationStoreRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['protocol'] = Notification::generateProtocol();

            // Remove symptom_ids do data pois não é uma coluna
            $symptomIds = $data['symptom_ids'] ?? [];
            unset($data['symptom_ids']);

            // Se o usuário estiver autenticado, vincula a notificação
            if (auth('sanctum')->check()) {
                $data['user_id'] = auth('sanctum')->id();
            }

            $notification = Notification::create($data);

            // Sincroniza os sintomas na pivot table
            if (!empty($symptomIds)) {
                $notification->symptoms()->sync($symptomIds);
            }

            // Envia e-mail de confirmação
            Mail::to($notification->email)
                ->send(new NotificationConfirmationMail($notification));

            return $this->sendResponse([
                'id' => $notification->id,
                'protocol' => $notification->protocol,
            ], 'Notificação registrada com sucesso', 201);
        } catch (\Exception $e) {
            return $this->sendError('Erro ao registrar notificação: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Lista todas as notificações (admin/gestor).
        *
        * @OA\Get(
        *   path="/api/notifications",
        *   tags={"Notificacoes"},
        *   summary="Listar notificacoes",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(name="status", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="search", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="city", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="state", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="neighborhood", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="symptom_id", in="query", required=false, @OA\Schema(type="integer")),
        *   @OA\Parameter(name="symptoms_date_from", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="symptoms_date_to", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="created_from", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="created_to", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="page", in="query", required=false, @OA\Schema(type="integer", example=1)),
        *   @OA\Response(
        *     response=200,
        *     description="Lista de notificacoes",
        *     @OA\JsonContent(ref="#/components/schemas/NotificationListResponse")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function index(): JsonResponse
    {
        $this->authorizePermission('notifications.view');

        try {
            $query = Notification::with(['user', 'symptoms'])
                ->orderBy('created_at', 'desc');

            // Filtro por status
            if (request()->has('status') && request('status') !== 'all') {
                $query->where('status', request('status'));
            }

            // Busca por protocolo, nome ou cidade
            if (request()->has('search') && request('search')) {
                $search = request('search');
                $query->where(function ($q) use ($search) {
                    $q->where('protocol', 'ilike', "%{$search}%")
                        ->orWhere('name', 'ilike', "%{$search}%")
                        ->orWhere('city', 'ilike', "%{$search}%");
                });
            }

            // Filtro por cidade
            if (request()->filled('city')) {
                $query->where('city', 'ilike', '%' . request('city') . '%');
            }

            // Filtro por estado
            if (request()->filled('state')) {
                $query->where('state', 'ilike', '%' . request('state') . '%');
            }

            // Filtro por bairro
            if (request()->filled('neighborhood')) {
                $query->where('neighborhood', 'ilike', '%' . request('neighborhood') . '%');
            }

            // Filtro por sintoma específico
            if (request()->filled('symptom_id')) {
                $query->whereHas('symptoms', function ($q) {
                    $q->where('symptoms.id', request('symptom_id'));
                });
            }

            // Filtro por data dos sintomas
            if (request()->filled('symptoms_date_from')) {
                $query->whereDate('symptoms_date', '>=', request('symptoms_date_from'));
            }
            if (request()->filled('symptoms_date_to')) {
                $query->whereDate('symptoms_date', '<=', request('symptoms_date_to'));
            }

            // Filtro por data da notificação (created_at)
            if (request()->filled('created_from')) {
                $query->whereDate('created_at', '>=', request('created_from'));
            }
            if (request()->filled('created_to')) {
                $query->whereDate('created_at', '<=', request('created_to'));
            }

            $notifications = $query->paginate(15);

            return $this->sendResponse($notifications, 'Notificações listadas com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Exibe uma notificação específica.
        *
        * @OA\Get(
        *   path="/api/notifications/{notification}",
        *   tags={"Notificacoes"},
        *   summary="Detalhar notificacao",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="notification",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Notificacao recuperada",
        *     @OA\JsonContent(ref="#/components/schemas/Notification")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function show(Notification $notification): JsonResponse
    {
        $this->authorizePermission('notifications.view');

        try {
            $notification->load(['user', 'symptoms']);
            return $this->sendResponse($notification, 'Notificação recuperada com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Atualiza o status de uma notificação.
        *
        * @OA\Patch(
        *   path="/api/notifications/{notification}/status",
        *   tags={"Notificacoes"},
        *   summary="Atualizar status",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="notification",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/NotificationStatusUpdateRequest")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Status atualizado",
        *     @OA\JsonContent(ref="#/components/schemas/Notification")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function updateStatus(Notification $notification): JsonResponse
    {
        $this->authorizePermission('notifications.edit');

        try {
            $validated = request()->validate([
                'status' => 'required|in:pending,in_analysis,confirmed,discarded',
            ]);

            $oldStatusLabel = $notification->status_label;
            $notification->update($validated);
            $newStatusLabel = $notification->fresh()->status_label;

            // Envia e-mail de alerta sobre alteração de status
            Mail::to($notification->email)
                ->send(new NotificationStatusChangedMail($notification, $oldStatusLabel, $newStatusLabel));

            return $this->sendResponse($notification, 'Status atualizado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Exporta casos confirmados em CSV com filtros.
        *
        * @OA\Get(
        *   path="/api/notifications/export-csv",
        *   tags={"Notificacoes"},
        *   summary="Exportar casos confirmados (CSV)",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(name="state", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="city", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="neighborhood", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="symptoms_date_from", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="symptoms_date_to", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="created_from", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="created_to", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="symptom_id", in="query", required=false, @OA\Schema(type="integer")),
        *   @OA\Parameter(name="search", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Response(
        *     response=200,
        *     description="Arquivo CSV",
        *     content={@OA\MediaType(mediaType="text/csv")}
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function exportCsv(): StreamedResponse
    {
        $this->authorizePermission('notifications.view');

        $query = Notification::with(['symptoms'])
            ->where('status', 'confirmed')
            ->orderBy('created_at', 'desc');

        // Filtro por estado
        if (request()->filled('state')) {
            $query->where('state', request('state'));
        }

        // Filtro por cidade
        if (request()->filled('city')) {
            $query->where('city', 'ilike', '%' . request('city') . '%');
        }

        // Filtro por bairro
        if (request()->filled('neighborhood')) {
            $query->where('neighborhood', 'ilike', '%' . request('neighborhood') . '%');
        }

        // Filtro por data dos sintomas
        if (request()->filled('symptoms_date_from')) {
            $query->whereDate('symptoms_date', '>=', request('symptoms_date_from'));
        }
        if (request()->filled('symptoms_date_to')) {
            $query->whereDate('symptoms_date', '<=', request('symptoms_date_to'));
        }

        // Filtro por data da notificação
        if (request()->filled('created_from')) {
            $query->whereDate('created_at', '>=', request('created_from'));
        }
        if (request()->filled('created_to')) {
            $query->whereDate('created_at', '<=', request('created_to'));
        }

        // Filtro por sintoma específico
        if (request()->filled('symptom_id')) {
            $query->whereHas('symptoms', function ($q) {
                $q->where('symptoms.id', request('symptom_id'));
            });
        }

        // Busca textual
        if (request()->filled('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('protocol', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%")
                    ->orWhere('city', 'ilike', "%{$search}%");
            });
        }

        $notifications = $query->get();

        $filename = 'casos-confirmados-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($notifications) {
            $handle = fopen('php://output', 'w');

            // BOM para Excel reconhecer UTF-8
            fwrite($handle, "\xEF\xBB\xBF");

            // Header
            fputcsv($handle, [
                'Protocolo',
                'Nome',
                'CPF',
                'E-mail',
                'CEP',
                'Estado',
                'Cidade',
                'Bairro',
                'Data dos Sintomas',
                'Sintomas',
                'Detalhes',
                'Data da Notificação',
            ], ';');

            foreach ($notifications as $n) {
                $symptoms = $n->symptoms->pluck('name')->implode(', ');

                fputcsv($handle, [
                    $n->protocol,
                    $n->name ?? 'Não informado',
                    $n->cpf,
                    $n->email,
                    $n->cep ?? '',
                    $n->state,
                    $n->city,
                    $n->neighborhood ?? '',
                    $n->symptoms_date?->format('d/m/Y') ?? '',
                    $symptoms,
                    $n->details ?? '',
                    $n->created_at->format('d/m/Y'),
                ], ';');
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * Exporta casos confirmados em PDF com filtros.
        *
        * @OA\Get(
        *   path="/api/notifications/export-pdf",
        *   tags={"Notificacoes"},
        *   summary="Exportar casos confirmados (PDF)",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(name="state", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="city", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="neighborhood", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Parameter(name="symptoms_date_from", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="symptoms_date_to", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="created_from", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="created_to", in="query", required=false, @OA\Schema(type="string", format="date")),
        *   @OA\Parameter(name="symptom_id", in="query", required=false, @OA\Schema(type="integer")),
        *   @OA\Parameter(name="search", in="query", required=false, @OA\Schema(type="string")),
        *   @OA\Response(
        *     response=200,
        *     description="Arquivo PDF",
        *     content={@OA\MediaType(mediaType="application/pdf")}
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function exportPdf()
    {
        $this->authorizePermission('notifications.view');

        $query = Notification::with(['symptoms'])
            ->where('status', 'confirmed')
            ->orderBy('created_at', 'desc');

        $activeFilters = [];

        if (request()->filled('state')) {
            $query->where('state', request('state'));
            $activeFilters[] = 'Estado: ' . request('state');
        }

        if (request()->filled('city')) {
            $query->where('city', 'ilike', '%' . request('city') . '%');
            $activeFilters[] = 'Cidade: ' . request('city');
        }

        if (request()->filled('neighborhood')) {
            $query->where('neighborhood', 'ilike', '%' . request('neighborhood') . '%');
            $activeFilters[] = 'Bairro: ' . request('neighborhood');
        }

        if (request()->filled('symptoms_date_from')) {
            $query->whereDate('symptoms_date', '>=', request('symptoms_date_from'));
            $activeFilters[] = 'Sintomas a partir de: ' . request('symptoms_date_from');
        }
        if (request()->filled('symptoms_date_to')) {
            $query->whereDate('symptoms_date', '<=', request('symptoms_date_to'));
            $activeFilters[] = 'Sintomas até: ' . request('symptoms_date_to');
        }

        if (request()->filled('created_from')) {
            $query->whereDate('created_at', '>=', request('created_from'));
            $activeFilters[] = 'Notificação a partir de: ' . request('created_from');
        }
        if (request()->filled('created_to')) {
            $query->whereDate('created_at', '<=', request('created_to'));
            $activeFilters[] = 'Notificação até: ' . request('created_to');
        }

        if (request()->filled('symptom_id')) {
            $query->whereHas('symptoms', function ($q) {
                $q->where('symptoms.id', request('symptom_id'));
            });
            $symptomName = \App\Models\Symptom::find(request('symptom_id'))?->name ?? request('symptom_id');
            $activeFilters[] = 'Sintoma: ' . $symptomName;
        }

        if (request()->filled('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('protocol', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%")
                    ->orWhere('city', 'ilike', "%{$search}%");
            });
            $activeFilters[] = 'Busca: ' . $search;
        }

        $notifications = $query->get();

        $pdf = Pdf::loadView('reports.confirmed-cases-pdf', [
            'notifications' => $notifications,
            'total' => $notifications->count(),
            'generatedAt' => now()->format('d/m/Y H:i'),
            'activeFilters' => $activeFilters,
        ])->setPaper('a4', 'landscape');

        $filename = 'casos-confirmados-' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}
