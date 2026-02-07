<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,gestor,pesquisador',
        ];
    }

    /**
     * Mensagens de validação customizadas.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório',
            'name.string' => 'O nome deve ser um texto',
            'name.max' => 'O nome não pode ter mais de 255 caracteres',
            'email.required' => 'O email é obrigatório',
            'email.email' => 'O email deve ser válido',
            'email.unique' => 'Este email já está registrado',
            'password.required' => 'A senha é obrigatória',
            'password.string' => 'A senha deve ser um texto',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres',
            'role.required' => 'O grupo é obrigatório',
            'role.in' => 'O grupo fornecido é inválido',
        ];
    }
}
