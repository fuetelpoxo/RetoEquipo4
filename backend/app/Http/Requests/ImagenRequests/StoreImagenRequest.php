<?php

namespace App\Http\Requests\ImagenRequests;

use App\Rules\ValidarImagen;
use Illuminate\Foundation\Http\FormRequest;

class StoreImagenRequest extends FormRequest
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
            'imagen' => ['required', new ValidarImagen], // Usamos la nueva regla personalizada
            'nombre' => 'required|string|max:255', // Nombre de la imagen, debe ser una cadena (sin límite de caracteres)

            // Validaciones de claves foráneas (ahora nullable)
            'equipo_id' => 'nullable|integer|exists:equipos,id', // El equipo debe existir en la tabla de equipos
            'jugador_id' => 'nullable|integer|exists:jugadores,id', // El jugador debe existir en la tabla de jugadores
            'partido_id' => 'nullable|integer|exists:partidos,id', // El partido debe existir en la tabla de partidos
            'patrocinador_id' => 'nullable|integer|exists:patrocinadores,id', // El patrocinador debe existir en la tabla de patrocinadores
            'reto_id' => 'nullable|integer|exists:retos,id', // El reto debe existir en la tabla de retos
            'ong_id' => 'nullable|integer|exists:ongs,id', // La ONG debe existir en la tabla de ongs
            'publicacion_id' => 'nullable|integer|exists:publicaciones,id', // La publicación debe existir en la tabla de publicaciones
            'pabellon_id' => 'nullable|integer|exists:pabellones,id', // El pabellón debe existir en la tabla de pabellones
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'imagen.required' => 'La imagen es obligatoria.',
            'imagen.image' => 'El archivo debe ser una imagen válida.',
            'nombre.required' => 'El nombre de la imagen es obligatorio.',
            'nombre.string' => 'El nombre de la imagen debe ser una cadena de texto.',
            'nombre.max' => 'El nombre de la imagen no puede exceder los 255 caracteres.',
            'equipo_id.integer' => 'El campo equipo debe ser un número entero.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',
            'jugador_id.integer' => 'El campo jugador debe ser un número entero.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',
            'partido_id.integer' => 'El campo partido debe ser un número entero.',
            'partido_id.exists' => 'El partido seleccionado no existe.',
            'patrocinador_id.integer' => 'El campo patrocinador debe ser un número entero.',
            'patrocinador_id.exists' => 'El patrocinador seleccionado no existe.',
            'reto_id.integer' => 'El campo reto debe ser un número entero.',
            'reto_id.exists' => 'El reto seleccionado no existe.',
            'ong_id.integer' => 'El campo ONG debe ser un número entero.',
            'ong_id.exists' => 'La ONG seleccionada no existe.',
            'publicacion_id.integer' => 'El campo publicación debe ser un número entero.',
            'publicacion_id.exists' => 'La publicación seleccionada no existe.',
            'pabellon_id.integer' => 'El campo pabellón debe ser un número entero.',
            'pabellon_id.exists' => 'El pabellón seleccionado no existe.',
        ];
    }
}
