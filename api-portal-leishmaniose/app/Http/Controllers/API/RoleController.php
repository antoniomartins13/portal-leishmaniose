<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends BaseController
{
    /**
     * Lista todos os grupos (admin only)
     */
    public function index(): JsonResponse
    {
        $this->authorizePermission('roles.view');

        try {
            $roles = Role::withCount('permissions')->get();
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
                'display_name' => 'required|string',
                'description' => 'nullable|string',
            ]);

            $role = Role::create($validated);

            return $this->sendResponse($role, 'Grupo criado com sucesso', 201);
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
