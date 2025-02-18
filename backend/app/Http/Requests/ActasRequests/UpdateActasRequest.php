<?php

namespace App\Http\Requests\ActasRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActasRequest extends FormRequest
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
            'partido_id' => 'nullable|exists:partidos,id',  // Partido puede ser nulo, pero si está presente debe existir
            'jugador_id' => 'nullable|exists:jugadores,id',  // Jugador puede ser nulo, pero si está presente debe existir
            'incidencia' => 'nullable|string',  // Incidencia es opcional, y si se proporciona, debe ser una cadena
            'hora' => 'nullable|regex:/^\d{1,2}:\d{2}$/',  // La hora es opcional, pero si está presente, debe cumplir con el formato HH:MM
            'comentario' => 'nullable|string',  // Comentario es opcional, pero si está presente debe ser una cadena
        ];
    }
}
