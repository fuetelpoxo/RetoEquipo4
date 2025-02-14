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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'equipo_id' => 'required|exists:equipos,id',
            'nombre' => 'required|string|max:255',
            'apellido1' => 'required|string|max:255',
            'apellido2' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'estudio_id' => 'required|exists:estudios,id',
            'dni' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'telefono' => 'required|string|max:255'
        ];
    }
}
