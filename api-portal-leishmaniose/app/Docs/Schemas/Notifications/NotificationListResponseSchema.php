<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Notifications;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="NotificationListResponse",
 *   type="object",
 *   required={"current_page","data","total"},
 *   @OA\Property(property="current_page", type="integer", example=1),
 *   @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Notification")),
 *   @OA\Property(property="first_page_url", type="string", nullable=true),
 *   @OA\Property(property="from", type="integer", nullable=true),
 *   @OA\Property(property="last_page", type="integer", example=1),
 *   @OA\Property(property="last_page_url", type="string", nullable=true),
 *   @OA\Property(
 *     property="links",
 *     type="array",
 *     @OA\Items(
 *       type="object",
 *       @OA\Property(property="url", type="string", nullable=true),
 *       @OA\Property(property="label", type="string"),
 *       @OA\Property(property="active", type="boolean")
 *     )
 *   ),
 *   @OA\Property(property="next_page_url", type="string", nullable=true),
 *   @OA\Property(property="path", type="string", nullable=true),
 *   @OA\Property(property="per_page", type="integer", example=15),
 *   @OA\Property(property="prev_page_url", type="string", nullable=true),
 *   @OA\Property(property="to", type="integer", nullable=true),
 *   @OA\Property(property="total", type="integer", example=1)
 * )
 */
final class NotificationListResponseSchema
{
}
