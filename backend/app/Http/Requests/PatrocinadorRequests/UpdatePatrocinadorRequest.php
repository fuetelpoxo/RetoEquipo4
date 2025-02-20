<?php

namespace App\Http\Requests\PatrocinadorRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatrocinadorRequest extends FormRequest
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
            'nombre' => 'nullable|string|max:20'
        ];
    }
    public function messages()
    {
        return [
            'nombre.string'=>'El nombre debe ser una cadena de texto',
            'nombre.max'=>'El nombre no puede exceder los 20 caracteres'
        ];
    }
}
