<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Auth;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="AuthUser",
 *   type="object",
 *   required={"id","name","email","roles","permissions"},
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="name", type="string", example="Maria Souza"),
 *   @OA\Property(property="email", type="string", example="maria@exemplo.com"),
 *   @OA\Property(
 *     property="roles",
 *     type="array",
 *     @OA\Items(type="string"),
 *     example={"admin"}
 *   ),
 *   @OA\Property(
 *     property="permissions",
 *     type="array",
 *     @OA\Items(type="string"),
 *     example={"users.view","notifications.view"}
 *   )
 * )
 */
final class AuthUserSchema
{
}
