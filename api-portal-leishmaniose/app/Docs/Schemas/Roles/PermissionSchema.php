<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Roles;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="Permission",
 *   type="object",
 *   required={"id","name"},
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="name", type="string", example="users.view")
 * )
 */
final class PermissionSchema
{
}
