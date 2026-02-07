<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determina se o usuário é autorizado para fazer a requisição.
     */
    public function authorize(): bool
    {
        return true; // Permissão é checada no Controller
    }

    /**
     * Retorna as regras de validação.
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                Rule::unique('users', 'email')->ignore($this->route('user')?->id),
            ],
            'password' => 'sometimes|nullable|string|min:8',
            'role' => 'sometimes|in:admin,gestor,pesquisador',
        ];
    }

    /**
     * Mensagens de validação customizadas.
     */
    public function messages(): array
    {
        return [
            'name.string' => 'O nome deve ser um texto',
            'name.max' => 'O nome não pode ter mais de 255 caracteres',
            'email.email' => 'O email deve ser válido',
            'email.unique' => 'Este email já está registrado',
            'password.string' => 'A senha deve ser um texto',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres',
            'role.in' => 'O grupo fornecido é inválido',
        ];
    }
}
