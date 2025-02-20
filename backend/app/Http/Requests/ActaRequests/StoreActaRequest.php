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
            'jugador_id' => 'required|exists:jugadores,id', // Jugador obligatorio y debe existir
            'incidencia' => 'required|in:amarilla,roja,lesion,cambio,gol,falta,penalti', // Solo permite estos valores
            'hora' => 'required|regex:/^\d{1,2}:\d{2}$/', // Hora es obligatoria y debe estar en formato 'HH:MM'
            'comentario' => 'nullable|string' // Comentario es opcional, pero si se proporciona debe ser string
        ];
    }
    public function messages()
    {
        return [
            'partido_id.required' => 'El partido es obligatorio.',
            'partido_id.exists' => 'El partido seleccionado no existe.',
            'jugador_id.required' => 'El jugador es obligatorio.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',
            'incidencia.required' => 'La incidencia es obligatoria.',
            'incidencia.string' => 'La incidencia debe ser una cadena de texto.',
            'incidencia.max' => 'La incidencia no puede tener más de 255 caracteres.',
            'hora.required' => 'La hora es obligatoria.',
            'hora.date_format' => 'La hora debe estar en el formato correcto (HH:MM).',
            'comentario.string' => 'El comentario debe ser una cadena de texto.',
        ];
    }
}