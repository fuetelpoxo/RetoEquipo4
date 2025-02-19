<?php

namespace App\Http\Requests\ImagenRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImagenRequest extends FormRequest
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
            // Validaciones de campos de imagen (todos pueden ser nullables)
            'url' => 'nullable|url', // La URL de la imagen puede ser nula, pero si se proporciona, debe ser válida
            'nombre' => 'nullable|string|max:255', // El nombre puede ser nulo, pero si se proporciona, debe ser una cadena de texto
            // Validaciones de claves foráneas
            'equipo_id' => 'nullable|exists:equipos,id', // El equipo puede ser nulo, pero si se proporciona, debe existir
            'jugador_id' => 'nullable|exists:jugadores,id', // El jugador puede ser nulo, pero si se proporciona, debe existir
            'partido_id' => 'nullable|exists:partidos,id', // El partido puede ser nulo, pero si se proporciona, debe existir
            'patrocinador_id' => 'nullable|exists:patrocinadores,id', // El patrocinador puede ser nulo, pero si se proporciona, debe existir
            'reto_id' => 'nullable|exists:retos,id', // El reto puede ser nulo, pero si se proporciona, debe existir
            'ong_id' => 'nullable|exists:ongs,id', // La ONG puede ser nula, pero si se proporciona, debe existir
            'publicacion_id' => 'nullable|exists:publicaciones,id', // La publicación puede ser nula, pero si se proporciona, debe existir
            'pabellon_id' => 'nullable|exists:pabellones,id', // El pabellón puede ser nulo, pero si se proporciona, debe existir
        ];
    }

    /**
     * Mensajes personalizados de validación.
     */
    public function messages()
    {
        return [
            'url.url' => 'La URL de la imagen debe ser válida.',
            'nombre.string' => 'El nombre de la imagen debe ser una cadena de texto.',
            'nombre.max' => 'El nombre de la imagen no puede exceder los 255 caracteres.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',
            'partido_id.exists' => 'El partido seleccionado no existe.',
            'patrocinador_id.exists' => 'El patrocinador seleccionado no existe.',
            'reto_id.exists' => 'El reto seleccionado no existe.',
            'ong_id.exists' => 'La ONG seleccionada no existe.',
            'publicacion_id.exists' => 'La publicación seleccionada no existe.',
            'pabellon_id.exists' => 'El pabellón seleccionado no existe.',
        ];
    }
}