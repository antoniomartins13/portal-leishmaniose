<?php

declare(strict_types=1);

namespace App\Helpers;

class GetControllerNameHelper
{
    /**
     * Get the controller name from a controller instance.
     *
     * @param mixed $controller
     * @return string
     */
    public static function handle($controller): string
    {
        $className = class_basename($controller);
        return str_replace('Controller', '', $className);
    }
}
