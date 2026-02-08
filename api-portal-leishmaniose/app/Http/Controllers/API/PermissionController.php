<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Permission;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *   name="Permissoes",
 *   description="Permissoes disponiveis"
 * )
 */
class PermissionController extends BaseController
{
    /**
     * Lista todas as permissões disponíveis
        *
        * @OA\Get(
        *   path="/api/permissions",
        *   tags={"Permissoes"},
        *   summary="Listar permissoes",
        *   security={{"bearerAuth":{}}},
        *   @OA\Response(
        *     response=200,
        *     description="Lista de permissoes",
        *     @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Permission"))
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
            $permissions = Permission::select(['id', 'name'])->get();
            return $this->sendResponse($permissions, 'Permissões listadas com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
