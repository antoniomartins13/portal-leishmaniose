<?php

declare(strict_types=1);

namespace App\Docs\Schemas\Symptoms;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *   schema="Symptom",
 *   type="object",
 *   required={"id","name","slug","active"},
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="name", type="string", example="Febre"),
 *   @OA\Property(property="slug", type="string", example="febre"),
 *   @OA\Property(property="description", type="string", nullable=true, example="Sintoma comum"),
 *   @OA\Property(property="active", type="boolean", example=true),
 *   @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *   @OA\Property(property="updated_at", type="string", format="date-time", nullable=true)
 * )
 */
final class SymptomSchema
{
}
