<?php

namespace App\Http\Requests\EquipoRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipoRequest extends FormRequest
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
            'nombre' => 'required|string|unique:equipos,nombre|max:100', // Ajustado a 100 según la migración
            'centro_id' => 'required|integer|exists:centros,id', // Añadido integer
            'grupo' => 'required|in:A,B',
        ];
    }
    public function messages(): array
    {
        return [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
            'nombre.max' => 'El campo nombre no debe exceder los 100 caracteres.',
            'nombre.unique' => 'El nombre del equipo ya se encuentra en nuestra base de datos.',
            'centro_id.required' => 'El campo centro es obligatorio.',
            'centro_id.integer' => 'El campo centro debe ser un número entero.',
            'centro_id.exists' => 'El centro seleccionado no existe.',
            'grupo.required' => 'El campo grupo es obligatorio.',
            'grupo.in' => 'El campo grupo debe ser A o B.',
        ];
    }
}
