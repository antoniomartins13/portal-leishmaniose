<?php

declare(strict_types=1);

namespace App\Helpers;

class PermissionHelper
{
    /**
     * Verifica se o usuário autenticado tem permissão
     * Lança HttpException 403 se negado
     */
    public static function authorize(string $permission): void
    {
        $user = auth()->user();

        if (!$user || !$user->can($permission)) {
            abort(403, "Você não tem permissão para: {$permission}");
        }
    }

    /**
     * Retorna true/false se o usuário tem permissão
     */
    public static function can(string $permission): bool
    {
        $user = auth()->user();
        return $user && $user->can($permission);
    }

    /**
     * Retorna true/false se o usuário tem algum dos cargos
     */
    public static function hasRole($roles): bool
    {
        $user = auth()->user();
        return $user && $user->hasAnyRole($roles);
    }

    /**
     * Set default permissions for a controller.
     *
     * @param mixed $controller
     * @param string $model
     * @return void
     */
    public static function SetDefaultPermissionsForController($controller, string $model): void
    {
        // TODO: Implement default permissions for controller
    }

    /**
     * Set permissions for a specific action.
     *
     * @param mixed $controller
     * @param string $model
     * @param mixed $action
     * @param array|string $functionNames
     * @return void
     */
    public static function SetPermission($controller, string $model, $action, $functionNames): void
    {
        // TODO: Implement permission setting
    }
}
