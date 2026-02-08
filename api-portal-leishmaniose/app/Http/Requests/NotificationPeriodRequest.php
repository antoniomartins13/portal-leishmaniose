<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationPeriodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'created_from' => ['nullable', 'date'],
            'created_to' => ['nullable', 'date', 'after_or_equal:created_from'],
        ];
    }

    public function messages(): array
    {
        return [
            'created_from.date' => 'A data inicial e invalida',
            'created_to.date' => 'A data final e invalida',
            'created_to.after_or_equal' => 'A data final deve ser maior ou igual a data inicial',
        ];
    }
}
