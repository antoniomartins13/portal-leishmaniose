<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Enums\ControllerActions;
use App\Helpers\GetControllerNameHelper;
use App\Helpers\PermissionHelper;
use App\Http\Controllers\Controller;
use App\Models\Authentication\User;
use App\Services\Authentication\LogService;
use Exception;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{

    /**
     * Valida permissão e aborta com 403 se não tiver
     */
    protected function authorize(string $permission): void
    {
        PermissionHelper::authorize($permission);
    }

    /**
     * Verifica se usuário tem permissão (retorna bool)
     */
    protected function can(string $permission): bool
    {
        return PermissionHelper::can($permission);
    }

    /**
     * Verifica se usuário tem cargo
     */
    protected function hasRole($roles): bool
    {
        return PermissionHelper::hasRole($roles);
    }

    public function sendResponse($result, string $message, int $code = 200): JsonResponse
    {
        if (request()->user()) {
            $this->createLog();
        }

        return response()->json($result, $code);
    }

    public function sendError($error, $errorMessages = [], $code = 400): JsonResponse
    {
        $response = [
            'errors' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['messages'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    /**
     * Retorna o usuário autenticado na requisição
     *
     * @return User|null
     */
    public function takeUser()
    {
        return request()->user();
    }

    public function setDefaultPermissions(string $model)
    {
        $this->validateNamespace($model);
        PermissionHelper::SetDefaultPermissionsForController($this, $model);
    }

    public function setCreatePermissions(string $model, array|string $functionNames)
    {
        $this->validateNamespace($model);
        PermissionHelper::SetPermission($this, $model, ControllerActions::CREATE, $functionNames);
    }

    public function setUpdatePermissions(string $model, array|string $functionNames)
    {
        $this->validateNamespace($model);
        PermissionHelper::SetPermission($this, $model, ControllerActions::UPDATE, $functionNames);
    }

    public function setViewPermissions(string $model, array|string $functionNames)
    {
        $this->validateNamespace($model);
        PermissionHelper::SetPermission($this, $model, ControllerActions::VIEW, $functionNames);
    }

    public function setDeletePermissions(string $model, array|string $functionNames)
    {
        $this->validateNamespace($model);
        PermissionHelper::SetPermission($this, $model, ControllerActions::DELETE, $functionNames);
    }

    public function setReportPermissions(string $model, array|string $functionNames)
    {
        $this->validateNamespace($model);
        PermissionHelper::SetPermission($this, $model, ControllerActions::REPORT, $functionNames);
    }

    /**
     * Validates whether a string is a valid PHP class namespace:
     */
    private function validateNamespace($namespace): bool
    {
        // Remove leading and trailing backslashes
        $namespace = trim($namespace, '\\');

        // Split the namespace into individual parts
        $parts = explode('\\', $namespace);

        // Check if each part of the namespace is valid
        foreach ($parts as $part) {
            // Check if the part starts with a letter or underscore
            if (!preg_match('/^[a-zA-Z_]/', $part)) {
                throw new Exception('Invalid Namespace!');
            }

            // Check if the part contains only letters, digits, and underscores
            if (!preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $part)) {
                throw new Exception('Invalid Namespace!');
            }
        }

        return true;
    }

    private function createLog(): void
    {
        $logService = app()->make(LogService::class);
        $method = request()->method();
        $action = request()->route()->getActionMethod();
        $user = request()->user();

        // $allowedMethods = [
        //     'GET',
        //     'HEAD',
        //     'POST',
        //     'PUT',
        //     'DELETE',
        //     'CONNECT',
        //     'OPTIONS',
        //     'PATCH',
        //     'PURGE',
        //     'TRACE'
        // ];

        $allowedMethods = [
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
        ];

        if ($user && in_array($method, $allowedMethods)) {
            $logService->createLog($user, $action, GetControllerNameHelper::handle($this));
        }
    }
}
