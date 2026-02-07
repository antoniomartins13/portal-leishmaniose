<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Roles;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="Role",
 *   type="object",
 *   required={"id","name"},
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="name", type="string", example="admin"),
 *   @OA\Property(property="permissions_count", type="integer", nullable=true, example=12),
 *   @OA\Property(
 *     property="permissions",
 *     type="array",
 *     @OA\Items(ref="#/components/schemas/Permission"),
 *     nullable=true
 *   )
 * )
 */
final class RoleSchema
{
}
