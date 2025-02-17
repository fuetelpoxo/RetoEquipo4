<?php

namespace App\Http\Requests\ActaRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActaRequest extends FormRequest
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
            'partido_id' => 'required|exists:partidos,id',
            'jugador_id' => 'required|exists:jugadores,id',
            'incidencia' => 'required|in:amarilla,roja,lesion,cambio,gol,falta,penalti',
            'hora' => 'required|date_format:H:i',
            'comentario' => 'required|string'
        ];
    }
}
