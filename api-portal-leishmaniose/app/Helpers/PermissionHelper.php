<?php

declare(strict_types=1);

namespace App\Helpers;

class PermissionHelper
{
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
