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
            'partido_id' => 'required|exists:partidos,id', // Partido obligatorio y debe existir
            'jugador_id' => 'nullable|exists:jugadores,id', // Jugador opcional pero debe existir si se envía
            'incidencia' => 'required|in:amarilla,roja,lesion,cambio,gol,falta,penalti', // Solo permite estos valores
            'hora' => 'required|date_format:H:i', // Hora obligatoria en formato 'HH:MM'
            'comentario' => 'nullable|string' // Comentario opcional pero debe ser string
        ];
    }
    public function messages()
    {
        return [
            'partido_id.required' => 'El partido es obligatorio.',
            'partido_id.exists' => 'El partido seleccionado no existe.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',
            'incidencia.required' => 'La incidencia es obligatoria.',
            'incidencia.in' => 'La incidencia debe ser una de las siguientes: amarilla, roja, lesión, cambio, gol, falta o penalti.',
            'hora.required' => 'La hora es obligatoria.',
            'hora.date_format' => 'La hora debe estar en el formato correcto (HH:MM).',
            'comentario.string' => 'El comentario debe ser una cadena de texto.',
        ];
    }
}
