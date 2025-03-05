<?php

namespace App\Http\Requests\InscripcionRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInscripcionRequest extends FormRequest
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
            'comentarios' => 'required|string|min:5|max:300',
            'estado' => 'required|string|in:pendiente,aprobada,rechazada',
            'equipo_id' => 'required|integer|exists:equipos,id',
        ];
    }

    public function messages()
    {
        return [
            'comentarios.required'=>'El comentario es obligatorio',
            'comentarios.min'=>'El comentario debe tener minimo 5 caracteres',
            'comentarios.max'=>'El comentario debe tener como maximo 300 caracteres',
            'comentarios.string'=>'El comentario debe ser una cadena de texto',
            'estado.required'=>'El estado es obligatorio',
            'estado.string'=>'El estado debe ser una cadena de texto',
            'estado.in'=>'Opciones para estado: pendiente, aprobada, rechazada',
            'equipo_id.required'=>'El id del equipo es obligatorio',
            'equipo_id.integer'=>'El id del equipo debe ser un número entero',
            'equipo_id.exists'=>'El id del equipo no existe'
        ];
    }
}
