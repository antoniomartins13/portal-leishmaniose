<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Roles;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="RoleCreateRequest",
 *   type="object",
 *   required={"name"},
 *   @OA\Property(property="name", type="string", example="gestor"),
 *   @OA\Property(
 *     property="permissions",
 *     type="array",
 *     @OA\Items(type="string"),
 *     nullable=true,
 *     example={"users.view","notifications.view"}
 *   )
 * )
 */
final class RoleCreateRequestSchema
{
}
