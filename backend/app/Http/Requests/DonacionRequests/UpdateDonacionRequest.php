<?php

namespace App\Http\Requests\DonacionRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDonacionRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Lógica de autorización si es necesaria
    }

    public function rules()
    {
        return [
            'ong_id' => 'nullable|integer|exists:ongs,id', // Puede ser nulo, pero si está presente, debe ser entero y existir
            'kilos' => 'nullable|numeric|min:0', // Puede ser nulo, pero si está presente, debe ser un número no negativo
            'importe' => 'nullable|numeric|min:0', // Puede ser nulo, pero si está presente, debe ser un número no negativo
        ];
    }

    public function messages()
    {
        return [
            'ong_id.integer' => 'El ID de la ONG debe ser un número entero.',
            'ong_id.exists' => 'La ONG seleccionada no existe.',
            'kilos.numeric' => 'Los kilos deben ser un valor numérico.',
            'kilos.min' => 'Los kilos no pueden ser un valor negativo.',
            'importe.numeric' => 'El importe debe ser un valor numérico.',
            'importe.min' => 'El importe no puede ser un valor negativo.',
        ];
    }
}
