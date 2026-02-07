<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Notifications;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="NotificationCreateRequest",
 *   type="object",
 *   required={"cpf","email","cep","state","city","symptoms_date"},
 *   @OA\Property(property="name", type="string", nullable=true, example="Pessoa Notificante"),
 *   @OA\Property(property="cpf", type="string", example="000.000.000-00"),
 *   @OA\Property(property="email", type="string", example="contato@exemplo.com"),
 *   @OA\Property(property="cep", type="string", example="49000-000"),
 *   @OA\Property(property="state", type="string", example="SE"),
 *   @OA\Property(property="city", type="string", example="Aracaju"),
 *   @OA\Property(property="neighborhood", type="string", nullable=true, example="Centro"),
 *   @OA\Property(property="symptoms_date", type="string", format="date", example="2026-02-07"),
 *   @OA\Property(
 *     property="symptom_ids",
 *     type="array",
 *     @OA\Items(type="integer"),
 *     nullable=true,
 *     example={1,2}
 *   ),
 *   @OA\Property(property="details", type="string", nullable=true, example="Manchas avermelhadas")
 * )
 */
final class NotificationCreateRequestSchema
{
}
