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
            'ong_id' => 'required|exists:ongs,id',
            'kilos' => 'required|numeric',
            'importe' => 'required|numeric',
        ];
    }
}
