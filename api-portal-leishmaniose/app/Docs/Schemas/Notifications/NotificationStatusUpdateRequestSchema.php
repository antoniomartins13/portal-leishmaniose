<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Notifications;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="NotificationStatusUpdateRequest",
 *   type="object",
 *   required={"status"},
 *   @OA\Property(
 *     property="status",
 *     type="string",
 *     enum={"pending","in_analysis","confirmed","discarded"},
 *     example="confirmed"
 *   )
 * )
 */
final class NotificationStatusUpdateRequestSchema
{
}
