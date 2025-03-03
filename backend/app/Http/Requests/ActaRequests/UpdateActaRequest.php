<?php

namespace App\Http\Requests\ActaRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActaRequest extends FormRequest
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
            'partido_id' => 'nullable|integer|exists:partidos,id', // Partido opcional pero debe existir si se envía
            'jugador_id' => 'nullable|integer|exists:jugadores,id', // Jugador opcional pero debe existir si se envía
            'incidencia' => 'nullable|in:amarilla,roja,lesion,cambio,gol,falta,penalti', // Solo permite estos valores
            'hora' => 'nullable|date_format:H:i', // Hora opcional pero si se envía debe estar en formato 'HH:MM'
            'comentario' => 'nullable|string' // Comentario opcional pero debe ser string
        ];
    }
    public function messages()
    {
        return [
            'partido_id.exists' => 'El partido seleccionado no existe.',
            'partido_id.integer' => 'El id del partido debe ser un número entero.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',
            'jugador_id.id' => 'El id del jugador debe ser un número entero.',
            'incidencia.in' => 'La incidencia debe ser una de las siguientes: amarilla, roja, lesión, cambio, gol, falta o penalti.',
            'hora.date_format' => 'La hora debe estar en el formato correcto (HH:MM).',
            'comentario.string' => 'El comentario debe ser una cadena de texto.',
        ];
    }
}
