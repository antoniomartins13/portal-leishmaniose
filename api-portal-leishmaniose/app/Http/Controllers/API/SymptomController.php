<?php

namespace App\Http\Controllers\API;

use App\Models\Symptom;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *   name="Sintomas",
 *   description="Sintomas relacionados a notificacoes"
 * )
 */
class SymptomController extends BaseController
{
    /**
     * Lista todos os sintomas ativos.
     * Esta rota é pública - não precisa de autenticação.
        *
        * @OA\Get(
        *   path="/api/symptoms",
        *   tags={"Sintomas"},
        *   summary="Listar sintomas ativos",
        *   @OA\Response(
        *     response=200,
        *     description="Lista de sintomas",
        *     @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Symptom"))
        *   ),
        *   @OA\Response(
        *     response=500,
        *     description="Erro ao listar",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function index(): JsonResponse
    {
        try {
            $symptoms = Symptom::active()
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'description']);

            return $this->sendResponse($symptoms, 'Sintomas listados com sucesso');
        } catch (\Exception $e) {
            return $this->sendError('Erro ao listar sintomas: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Lista todos os sintomas (ativos e inativos) para o painel admin.
     * Requer autenticação e permissão symptoms.view.
        *
        * @OA\Get(
        *   path="/api/symptoms/all",
        *   tags={"Sintomas"},
        *   summary="Listar sintomas (admin)",
        *   security={{"bearerAuth":{}}},
        *   @OA\Response(
        *     response=200,
        *     description="Lista de sintomas",
        *     @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Symptom"))
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function adminIndex(): JsonResponse
    {
        $this->authorizePermission('symptoms.view');

        try {
            $symptoms = Symptom::orderBy('name')->get();

            return $this->sendResponse($symptoms, 'Sintomas listados com sucesso');
        } catch (\Exception $e) {
            return $this->sendError('Erro ao listar sintomas: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Cria um novo sintoma (admin only).
        *
        * @OA\Post(
        *   path="/api/symptoms",
        *   tags={"Sintomas"},
        *   summary="Criar sintoma",
        *   security={{"bearerAuth":{}}},
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(
        *       type="object",
        *       required={"name"},
        *       @OA\Property(property="name", type="string", example="Febre"),
        *       @OA\Property(property="description", type="string", nullable=true, example="Sintoma comum"),
        *       @OA\Property(property="active", type="boolean", example=true)
        *     )
        *   ),
        *   @OA\Response(
        *     response=201,
        *     description="Sintoma criado",
        *     @OA\JsonContent(ref="#/components/schemas/Symptom")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function store(): JsonResponse
    {
        $this->authorizePermission('symptoms.create');

        try {
            $validated = request()->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:500',
                'active' => 'boolean',
            ]);

            $validated['slug'] = Str::slug($validated['name'], '_');

            $symptom = Symptom::create($validated);

            return $this->sendResponse($symptom, 'Sintoma criado com sucesso', 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Atualiza um sintoma (admin only).
        *
        * @OA\Patch(
        *   path="/api/symptoms/{symptom}",
        *   tags={"Sintomas"},
        *   summary="Atualizar sintoma",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="symptom",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(
        *       type="object",
        *       @OA\Property(property="name", type="string", example="Febre persistente"),
        *       @OA\Property(property="description", type="string", nullable=true, example="Sintoma frequente"),
        *       @OA\Property(property="active", type="boolean", example=true)
        *     )
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Sintoma atualizado",
        *     @OA\JsonContent(ref="#/components/schemas/Symptom")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function update(Symptom $symptom): JsonResponse
    {
        $this->authorizePermission('symptoms.edit');

        try {
            $validated = request()->validate([
                'name' => 'string|max:255',
                'description' => 'nullable|string|max:500',
                'active' => 'boolean',
            ]);

            if (isset($validated['name'])) {
                $validated['slug'] = Str::slug($validated['name'], '_');
            }

            $symptom->update($validated);

            return $this->sendResponse($symptom, 'Sintoma atualizado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Remove um sintoma (admin only).
        *
        * @OA\Delete(
        *   path="/api/symptoms/{symptom}",
        *   tags={"Sintomas"},
        *   summary="Remover sintoma",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="symptom",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Sintoma removido",
        *     @OA\JsonContent(type="object")
        *   ),
        *   @OA\Response(
        *     response=500,
        *     description="Falha ao remover",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function destroy(Symptom $symptom): JsonResponse
    {
        $this->authorizePermission('symptoms.delete');

        try {
            $symptom->delete();
            return $this->sendResponse(null, 'Sintoma removido com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
