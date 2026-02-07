<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *   name="Grupos",
 *   description="Gestao de grupos e permissoes"
 * )
 */
class RoleController extends BaseController
{
    /**
     * Lista todos os grupos (admin only)
        *
        * @OA\Get(
        *   path="/api/roles",
        *   tags={"Grupos"},
        *   summary="Listar grupos",
        *   security={{"bearerAuth":{}}},
        *   @OA\Response(
        *     response=200,
        *     description="Lista de grupos",
        *     @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Role"))
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
        *
        * @OA\Post(
        *   path="/api/roles",
        *   tags={"Grupos"},
        *   summary="Criar grupo",
        *   security={{"bearerAuth":{}}},
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/RoleCreateRequest")
        *   ),
        *   @OA\Response(
        *     response=201,
        *     description="Grupo criado",
        *     @OA\JsonContent(ref="#/components/schemas/Role")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        *
        * @OA\Get(
        *   path="/api/roles/{role}",
        *   tags={"Grupos"},
        *   summary="Detalhar grupo",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="role",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Grupo recuperado",
        *     @OA\JsonContent(ref="#/components/schemas/Role")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        *
        * @OA\Patch(
        *   path="/api/roles/{role}",
        *   tags={"Grupos"},
        *   summary="Atualizar grupo",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="role",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/RoleUpdateRequest")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Grupo atualizado",
        *     @OA\JsonContent(ref="#/components/schemas/Role")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        *
        * @OA\Delete(
        *   path="/api/roles/{role}",
        *   tags={"Grupos"},
        *   summary="Deletar grupo",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="role",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Grupo removido",
        *     @OA\JsonContent(type="object")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha ao remover",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
