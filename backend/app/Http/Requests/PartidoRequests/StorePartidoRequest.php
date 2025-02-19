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
            'equipoL_id' => 'required|exists:equipos,id',
            'equipoV_id' => 'required|exists:equipos,id',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            'golesL' => 'required|integer',
            'golesV' => 'required|integer',
            'pabellon_id' => 'required|exists:pabellones,id'
        ];
    }
}
