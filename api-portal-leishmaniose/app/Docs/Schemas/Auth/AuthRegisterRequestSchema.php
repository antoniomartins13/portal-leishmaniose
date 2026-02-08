<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Auth;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="AuthRegisterRequest",
 *   type="object",
 *   required={"name","email","password","password_confirmation"},
 *   @OA\Property(property="name", type="string", example="Joao Silva"),
 *   @OA\Property(property="email", type="string", example="joao@exemplo.com"),
 *   @OA\Property(property="password", type="string", example="Senha#123"),
 *   @OA\Property(property="password_confirmation", type="string", example="Senha#123")
 * )
 */
final class AuthRegisterRequestSchema
{
}
