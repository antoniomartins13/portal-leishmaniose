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
     * Retorna os nomes customizados dos atributos.
     * (Opcional - pode ser removido se usar apenas o arquivo de tradução)
     */
    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'email' => 'e-mail',
            'password' => 'senha',
            'role' => 'grupo',
        ];
    }
}
