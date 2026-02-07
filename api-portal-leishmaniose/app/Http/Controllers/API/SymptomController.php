<?php

namespace App\Http\Controllers\API;

use App\Models\Symptom;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class SymptomController extends BaseController
{
    /**
     * Lista todos os sintomas ativos.
     * Esta rota é pública - não precisa de autenticação.
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
