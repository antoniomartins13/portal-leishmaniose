<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Auth;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="AuthProfileResponse",
 *   type="object",
 *   required={"user"},
 *   @OA\Property(property="user", ref="#/components/schemas/User")
 * )
 */
final class AuthProfileResponseSchema
{
}
