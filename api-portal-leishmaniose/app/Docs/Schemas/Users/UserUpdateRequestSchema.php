<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Users;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="UserUpdateRequest",
 *   type="object",
 *   @OA\Property(property="name", type="string", example="Usuario Atualizado"),
 *   @OA\Property(property="email", type="string", example="usuario@exemplo.com"),
 *   @OA\Property(property="password", type="string", nullable=true, example="Senha#123"),
 *   @OA\Property(property="role", type="string", example="pesquisador")
 * )
 */
final class UserUpdateRequestSchema
{
}
