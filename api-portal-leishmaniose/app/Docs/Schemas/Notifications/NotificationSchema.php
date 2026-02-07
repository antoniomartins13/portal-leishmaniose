<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Notifications;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="Notification",
 *   type="object",
 *   required={"id","protocol","cpf","email","cep","state","city","symptoms_date","status"},
 *   @OA\Property(property="id", type="integer", example=100),
 *   @OA\Property(property="protocol", type="string", example="LEI-2026-00010"),
 *   @OA\Property(property="name", type="string", nullable=true, example="Pessoa Notificante"),
 *   @OA\Property(property="cpf", type="string", example="000.000.000-00"),
 *   @OA\Property(property="email", type="string", example="contato@exemplo.com"),
 *   @OA\Property(property="cep", type="string", example="49000-000"),
 *   @OA\Property(property="state", type="string", example="SE"),
 *   @OA\Property(property="city", type="string", example="Aracaju"),
 *   @OA\Property(property="neighborhood", type="string", nullable=true, example="Centro"),
 *   @OA\Property(property="symptoms_date", type="string", format="date", example="2026-02-07"),
 *   @OA\Property(property="details", type="string", nullable=true, example="Manchas avermelhadas"),
 *   @OA\Property(property="status", type="string", example="pending"),
 *   @OA\Property(property="user_id", type="integer", nullable=true, example=5),
 *   @OA\Property(property="user", ref="#/components/schemas/User", nullable=true),
 *   @OA\Property(
 *     property="symptoms",
 *     type="array",
 *     @OA\Items(ref="#/components/schemas/Symptom"),
 *     nullable=true
 *   ),
 *   @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *   @OA\Property(property="updated_at", type="string", format="date-time", nullable=true)
 * )
 */
final class NotificationSchema
{
}
