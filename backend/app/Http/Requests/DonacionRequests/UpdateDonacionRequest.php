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
            'ong_id' => 'required|exists:ongs,id',
            'kilos' => 'required|numeric',
            'importe' => 'required|numeric',
        ];
    }
}
