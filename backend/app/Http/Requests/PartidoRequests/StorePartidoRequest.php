<?php

namespace App\Http\Requests\PartidoRequests;

use Illuminate\Foundation\Http\FormRequest;

class StorePartidoRequest extends FormRequest
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
            'equipoL_id' => 'required|integer|exists:equipos,id',
            'equipoV_id' => 'required|integer|exists:equipos,id',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i', // Mantengo el formato H:i para hora
            'golesL' => 'required|integer|gte:0', // Asegura que los goles sean mayores o iguales a 0
            'golesV' => 'required|integer|gte:0', // Asegura que los goles sean mayores o iguales a 0
            'pabellon_id' => 'required|integer|exists:pabellones,id'
        ];
    }
    public function messages(): array
    {
        return [
            'equipoL_id.required' => 'El equipo local es obligatorio.',
            'equipoL_id.integer' => 'El equipo local debe ser un valor entero.',
            'equipoL_id.exists' => 'El equipo local debe existir en la base de datos.',

            'equipoV_id.required' => 'El equipo visitante es obligatorio.',
            'equipoV_id.integer' => 'El equipo visitante debe ser un valor entero.',
            'equipoV_id.exists' => 'El equipo visitante debe existir en la base de datos.',

            'fecha.required' => 'La fecha del partido es obligatoria.',
            'fecha.date' => 'La fecha debe ser una fecha válida.',

            'hora.required' => 'La hora del partido es obligatoria.',
            'hora.date_format' => 'La hora debe tener el formato HH:mm.',

            'golesL.required' => 'Los goles del equipo local son obligatorios.',
            'golesL.integer' => 'Los goles deben ser un valor entero.',
            'golesL.gte' => 'Los goles deben ser un valor mayor o igual a cero.',

            'golesV.required' => 'Los goles del equipo visitante son obligatorios.',
            'golesV.integer' => 'Los goles deben ser un valor entero.',
            'golesV.gte' => 'Los goles deben ser un valor mayor o igual a cero.',

            'pabellon_id.required' => 'El pabellón es obligatorio.',
            'pabellon_id.integer' => 'El pabellón debe ser un valor entero.',
            'pabellon_id.exists' => 'El pabellón debe existir en la base de datos.',
        ];
    }
}
