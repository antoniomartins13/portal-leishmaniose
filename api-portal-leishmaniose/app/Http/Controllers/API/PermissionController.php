<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Permission;

class PermissionController extends BaseController
{
    /**
     * Lista todas as permissões disponíveis
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
