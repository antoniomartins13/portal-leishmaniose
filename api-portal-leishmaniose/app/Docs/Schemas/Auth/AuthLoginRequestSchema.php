<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Auth;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="AuthLoginRequest",
 *   type="object",
 *   required={"email","password"},
 *   @OA\Property(property="email", type="string", example="admin@exemplo.com"),
 *   @OA\Property(property="password", type="string", example="Senha#123")
 * )
 */
final class AuthLoginRequestSchema
{
}
