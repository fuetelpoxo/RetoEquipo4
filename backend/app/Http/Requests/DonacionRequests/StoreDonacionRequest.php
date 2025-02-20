<?php

namespace App\Http\Requests\DonacionRequests;


use Illuminate\Foundation\Http\FormRequest;


class StoreDonacionRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Puedes añadir lógica de autorización si lo necesitas
    }

    public function rules()
    {
        return [
            'ong_id' => 'required|integer|exists:ongs,id', // ONG obligatoria, debe ser un número entero y existir en la tabla
            'kilos' => 'required|numeric|min:0', // Obligatorio, número y no puede ser negativo
            'importe' => 'required|numeric|min:0', // Obligatorio, número y no puede ser negativo
        ];
    }
    public function messages(): array
    {
        return [
            'ong_id.required' => 'La ONG es obligatoria.',
            'ong_id.integer' => 'El ID de la ONG debe ser un número entero.',
            'ong_id.exists' => 'La ONG seleccionada no existe.',
            'kilos.required' => 'La cantidad de kilos es obligatoria.',
            'kilos.numeric' => 'Los kilos deben ser un valor numérico.',
            'kilos.min' => 'Los kilos no pueden ser un valor negativo.',
            'importe.required' => 'El importe es obligatorio.',
            'importe.numeric' => 'El importe debe ser un valor numérico.',
            'importe.min' => 'El importe no puede ser un valor negativo.',
        ];
    }
}
