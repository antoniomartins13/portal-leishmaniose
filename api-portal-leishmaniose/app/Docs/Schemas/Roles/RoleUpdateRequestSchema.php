<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Roles;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="RoleUpdateRequest",
 *   type="object",
 *   @OA\Property(property="name", type="string", example="pesquisador"),
 *   @OA\Property(
 *     property="permissions",
 *     type="array",
 *     @OA\Items(type="string"),
 *     nullable=true,
 *     example={"users.view"}
 *   )
 * )
 */
final class RoleUpdateRequestSchema
{
}
