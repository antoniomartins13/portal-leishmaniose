<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Users;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="UserCreateRequest",
 *   type="object",
 *   required={"name","email","password","role"},
 *   @OA\Property(property="name", type="string", example="Novo Usuario"),
 *   @OA\Property(property="email", type="string", example="novo@exemplo.com"),
 *   @OA\Property(property="password", type="string", example="Senha#123"),
 *   @OA\Property(property="role", type="string", example="gestor")
 * )
 */
final class UserCreateRequestSchema
{
}
