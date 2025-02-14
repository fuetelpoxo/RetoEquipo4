<?php

namespace App\Http\Requests\JugadorRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJugadorRequest extends FormRequest
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
            'equipo_id' => 'required|integer|exists:equipo,id', // Verifica que el equipo exista en la tabla 'equipo'
            'nombre' => 'required|string|max:255',
            'apellido1' => 'required|string|max:255',
            'apellido2' => 'nullable|string|max:255',
            'tipo' => 'required|string|in:futbolista,entrenador',
            'estudio_id' => 'required|integer|exists:estudios,id', // Verifica que el estudio exista en la tabla 'estudios'
            'dni' => 'required|string|max:9',
            'email' => 'required|email|max:255|unique:jugadores,email', // Verifica que el email no esté duplicado en la tabla 'jugadores'
            'telefono' => 'required|regex:/^[0-9]{9}$/',
        ];
    }
}
