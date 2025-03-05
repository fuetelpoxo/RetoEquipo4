<?php

namespace App\Http\Requests\PartidoRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePartidoRequest extends FormRequest
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
            'equipoL_id' => 'nullable|integer|exists:equipos,id', // `nullable` para permitir que no se pase en la actualización
            'equipoV_id' => 'nullable|integer|exists:equipos,id', // Lo mismo para el equipo visitante
            'fecha' => 'nullable|date', // Permitimos que no se pase la fecha si no se necesita actualizar
            'hora' => 'nullable|date_format:H:i', // Se mantiene el formato para hora
            'golesL' => 'nullable|integer|gte:0', // Permitimos que no se pase, pero si se pasa debe ser >= 0
            'golesV' => 'nullable|integer|gte:0', // Lo mismo para goles del equipo visitante
            'pabellon_id' => 'nullable|integer|exists:pabellones,id' // Permitimos que no se pase, pero si se pasa debe existir en la tabla de pabellones
        ];
    }
    public function messages(): array
    {
        return [
            'equipoL_id.integer' => 'El ID del equipo local debe ser un número entero.',
            'equipoL_id.exists' => 'El equipo local seleccionado no existe en la base de datos.',
            'equipoV_id.integer' => 'El ID del equipo visitante debe ser un número entero.',
            'equipoV_id.exists' => 'El equipo visitante seleccionado no existe en la base de datos.',
            'fecha.date' => 'La fecha debe ser una fecha válida.',
            'hora.date_format' => 'La hora debe tener el formato H:i (por ejemplo, 14:30).',
            'golesL.integer' => 'Los goles del equipo local deben ser un número entero.',
            'golesL.gte' => 'Los goles del equipo local deben ser mayores o iguales a 0.',
            'golesV.integer' => 'Los goles del equipo visitante deben ser un número entero.',
            'golesV.gte' => 'Los goles del equipo visitante deben ser mayores o iguales a 0.',
            'pabellon_id.integer' => 'El ID del pabellón debe ser un número entero.',
            'pabellon_id.exists' => 'El pabellón seleccionado no existe en la base de datos.',
        ];
    }
}
