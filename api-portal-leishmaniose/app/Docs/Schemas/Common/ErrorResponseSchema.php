<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Common;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="ErrorResponse",
 *   type="object",
 *   required={"errors"},
 *   @OA\Property(
 *     property="errors",
 *     type="string",
 *     example="Falha de validacao"
 *   ),
 *   @OA\Property(
 *     property="messages",
 *     type="array",
 *     nullable=true,
 *     @OA\Items(type="string"),
 *     example={"Detalhe do erro"}
 *   )
 * )
 */
final class ErrorResponseSchema
{
}
