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
            'ong_id' => 'required|exists:ongs,id', // La ONG es obligatoria y debe existir en la tabla de ONGs
            'kilos' => 'required|numeric', // Los kilos son obligatorios y deben ser un número
            'importe' => 'required|numeric', // El importe es obligatorio y debe ser un número
        ];
    }
}
