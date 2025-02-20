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
            'equipoL_id' => 'nullable|exists:equipos,id',
            'equipoV_id' => 'nullable|exists:equipos,id',
            'fecha' => 'nullable|date',
            'hora' => 'nullable|date_format:H:i',
            'golesL' => 'nullable|integer',
            'golesV' => 'nullable|integer',
            'pabellon_id' => 'nullable|exists:pabellones,id'
        ];
    }
}
