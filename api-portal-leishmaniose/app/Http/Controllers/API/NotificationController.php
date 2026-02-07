<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\NotificationStoreRequest;
use App\Mail\NotificationConfirmationMail;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class NotificationController extends BaseController
{
    /**
     * Cria uma nova notificação de caso.
     * Esta rota é pública - não precisa de autenticação.
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

            $notifications = $query->paginate(15);

            return $this->sendResponse($notifications, 'Notificações listadas com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Exibe uma notificação específica.
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
     */
    public function updateStatus(Notification $notification): JsonResponse
    {
        $this->authorizePermission('notifications.edit');

        try {
            $validated = request()->validate([
                'status' => 'required|in:pending,in_analysis,confirmed,discarded',
            ]);

            $notification->update($validated);

            return $this->sendResponse($notification, 'Status atualizado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }
}
