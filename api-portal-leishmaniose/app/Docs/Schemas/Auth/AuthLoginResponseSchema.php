<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Auth;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="AuthLoginResponse",
 *   type="object",
 *   required={"user","token"},
 *   @OA\Property(property="user", ref="#/components/schemas/AuthUser"),
 *   @OA\Property(property="token", type="string", example="1|token_exemplo")
 * )
 */
final class AuthLoginResponseSchema
{
}
