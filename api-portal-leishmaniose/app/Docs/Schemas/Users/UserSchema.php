<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Users;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="User",
 *   type="object",
 *   required={"id","name","email"},
 *   @OA\Property(property="id", type="integer", example=10),
 *   @OA\Property(property="name", type="string", example="Gestor Regional"),
 *   @OA\Property(property="email", type="string", example="gestor@exemplo.com"),
 *   @OA\Property(property="role", type="string", nullable=true, example="gestor"),
 *   @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *   @OA\Property(property="updated_at", type="string", format="date-time", nullable=true)
 * )
 */
final class UserSchema
{
}
