<?php

namespace App\Http\Requests\JugadorRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJugadorRequest extends FormRequest
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
            'equipo_id' => 'required',
            'nombre' => 'required',
            'apellido1' => 'required',
            'apellido2' => 'nullable',
            'tipo' => 'required',
            'estudio_id' => 'required',
            'dni' => 'required',
            'email' => 'required',
            'telefono' => 'required',
        ];
    }
}
