<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationStoreRequest extends FormRequest
{
    /**
     * Determina se o usuário é autorizado para fazer a requisição.
     */
    public function authorize(): bool
    {
        return true; // Rota pública
    }

    /**
     * Retorna as regras de validação.
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'cpf' => 'required|string|size:14',
            'email' => 'required|email|max:255',
            'cep' => 'required|string|size:9',
            'state' => 'required|string|size:2',
            'city' => 'required|string|max:255',
            'neighborhood' => 'nullable|string|max:255',
            'symptoms_date' => 'required|date',
            'symptom_ids' => 'nullable|array',
            'symptom_ids.*' => 'integer|exists:symptoms,id',
            'details' => 'nullable|string|max:2000',
        ];
    }

    /**
     * Retorna os nomes customizados dos atributos.
     */
    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'cpf' => 'CPF',
            'email' => 'e-mail',
            'cep' => 'CEP',
            'state' => 'estado',
            'city' => 'cidade',
            'neighborhood' => 'bairro',
            'symptoms_date' => 'data dos sintomas',
            'symptom_ids' => 'sintomas',
            'details' => 'detalhes',
        ];
    }
}
