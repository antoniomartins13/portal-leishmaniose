<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends BaseController
{
    /**
     * Lista todos os grupos (admin only)
     */
    public function index(): JsonResponse
    {
        $this->authorizePermission('roles.view');

        try {
            $roles = Role::withCount('permissions')->with('permissions')->get();
            return $this->sendResponse($roles, 'Grupos listados com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Cria um novo grupo
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorizePermission('roles.create');

        try {
            $validated = $request->validate([
                'name' => 'required|string|unique:roles,name',
                'permissions' => 'array',
                'permissions.*' => 'string',
            ]);

            $role = Role::create(['name' => $validated['name']]);

            // Sincroniza permissões se fornecidas
            if (!empty($validated['permissions'])) {
                $role->syncPermissions($validated['permissions']);
            }

            $role->load('permissions');

            return $this->sendResponse($role, 'Grupo criado com sucesso', 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Exibe um grupo com suas permissões
     */
    public function show(Role $role): JsonResponse
    {
        $this->authorizePermission('roles.view');

        try {
            $role->load('permissions');
            return $this->sendResponse($role, 'Grupo recuperado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Atualiza permissões de um grupo
     */
    public function update(Request $request, Role $role): JsonResponse
    {
        $this->authorizePermission('roles.edit');

        try {
            $validated = $request->validate([
                'name' => 'nullable|string|unique:roles,name,' . $role->id,
                'permissions' => 'array',
                'permissions.*' => 'string',
            ]);

            if (!empty($validated['name'])) {
                $role->name = $validated['name'];
                $role->save();
            }

            $permissions = $validated['permissions'] ?? [];

            // Sincroniza permissões (aceita nomes)
            $role->syncPermissions($permissions);

            $role->load('permissions');

            return $this->sendResponse($role, 'Permissões atualizadas com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Deleta um grupo
     */
    public function destroy(Role $role): JsonResponse
    {
        $this->authorizePermission('roles.delete');

        try {
            $role->delete();
            return $this->sendResponse(null, 'Grupo deletado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }
}
