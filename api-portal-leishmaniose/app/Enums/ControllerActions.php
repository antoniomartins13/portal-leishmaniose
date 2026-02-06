<?php

declare(strict_types=1);

namespace App\Enums;

enum ControllerActions: string
{
    case CREATE = 'create';
    case READ = 'read';
    case UPDATE = 'update';
    case DELETE = 'delete';
    case VIEW = 'view';
    case REPORT = 'report';
}
