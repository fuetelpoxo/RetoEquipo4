<?php

namespace App\Http\Requests\PublicacionRequests;

use Illuminate\Foundation\Http\FormRequest;

class StorePublicacionRequest extends FormRequest
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
            'titulo' => 'required|string|max:255', // el título es obligatorio, debe ser una cadena y no exceder 255 caracteres
            'texto' => 'required|string', // el texto es obligatorio y debe ser una cadena
            'portada' => 'nullable|boolean', // portada es opcional y debe ser un valor booleano
            'rutavideo' => 'nullable|url', // rutavideo es opcional, pero si está presente, debe ser una URL válida
            'rutaaudio' => 'nullable|url', // rutaaudio es opcional, pero si está presente, debe ser una URL válida

            // Validación de las claves foráneas
            'equipo_id' => 'nullable|integer|exists:equipos,id',
            'partido_id' => 'nullable|integer|exists:partidos,id',
            'patrocinador_id' => 'nullable|integer|exists:patrocinadores,id',
            'jugador_id' => 'nullable|integer|exists:jugadores,id',
            'reto_id' => 'nullable|integer|exists:retos,id',
            'ong_id' => 'nullable|integer|exists:ongs,id',
            'pabellon_id' => 'nullable|integer|exists:pabellones,id',
        ];
    }
    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio.',
            'titulo.string' => 'El título debe ser una cadena de caracteres.',
            'titulo.max' => 'El título no puede tener más de 255 caracteres.',

            'texto.required' => 'El texto es obligatorio.',
            'texto.string' => 'El texto debe ser una cadena de caracteres.',

            'portada.boolean' => 'La portada debe ser un valor booleano (true o false).',

            'rutavideo.url' => 'La URL del video no es válida.',

            'rutaaudio.url' => 'La URL del audio no es válida.',

            'equipo_id.integer' => 'El ID del equipo debe ser un número entero.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',

            'partido_id.integer' => 'El ID del partido debe ser un número entero.',
            'partido_id.exists' => 'El partido seleccionado no existe.',

            'patrocinador_id.integer' => 'El ID del patrocinador debe ser un número entero.',
            'patrocinador_id.exists' => 'El patrocinador seleccionado no existe.',

            'jugador_id.integer' => 'El ID del jugador debe ser un número entero.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',

            'reto_id.integer' => 'El ID del reto debe ser un número entero.',
            'reto_id.exists' => 'El reto seleccionado no existe.',

            'ong_id.integer' => 'El ID de la ONG debe ser un número entero.',
            'ong_id.exists' => 'La ONG seleccionada no existe.',

            'pabellon_id.integer' => 'El ID del pabellón debe ser un número entero.',
            'pabellon_id.exists' => 'El pabellón seleccionado no existe.',
        ];
    }

}
