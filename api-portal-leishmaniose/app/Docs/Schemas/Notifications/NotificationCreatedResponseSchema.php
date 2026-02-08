<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Notifications;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="NotificationCreatedResponse",
 *   type="object",
 *   required={"id","protocol"},
 *   @OA\Property(property="id", type="integer", example=100),
 *   @OA\Property(property="protocol", type="string", example="LEI-2026-00010")
 * )
 */
final class NotificationCreatedResponseSchema
{
}
