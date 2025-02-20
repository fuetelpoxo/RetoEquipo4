<?php

namespace App\Http\Requests\EquipoRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEquipoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre'=> 'nullable|string|max:255',
            'centro_id'=> 'nullable|integer|exists:centros,id',
            'grupo'=> 'nullable|in:A,B'
        ];
    }
}
