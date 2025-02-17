<?php

namespace App\Http\Requests\JugadorRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJugadorRequest extends FormRequest
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
            'equipo_id' => 'nullable|exists:equipos,id',
            'nombre' => 'nullable|string|max:255',
            'apellido1' => 'nullable|string|max:255',
            'apellido2' => 'nullable|string|max:255',
            'tipo' => 'nullable|string|max:255',
            'estudio_id' => 'nullable|exists:estudios,id',
            'dni' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:jugadores,email,' . $this->route('jugador'),
            'telefono' => 'nullable|string|max:255',
        ];
    }
}
