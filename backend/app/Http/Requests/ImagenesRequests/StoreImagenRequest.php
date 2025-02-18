<?php

namespace App\Http\Requests\ImagenesRequests;

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
             // Validaciones de campos de imagen
             'url' => 'required|url', // La URL de la imagen debe ser válida
             'nombre' => 'required|string|max:255', // Nombre de la imagen, debe ser una cadena no mayor a 255 caracteres

             // Validaciones de claves foráneas
             'equipo_id' => 'required|exists:equipos,id', // El equipo debe existir en la tabla de equipos
             'jugador_id' => 'required|exists:jugadores,id', // El jugador debe existir en la tabla de jugadores
             'partido_id' => 'required|exists:partidos,id', // El partido debe existir en la tabla de partidos
             'patrocinador_id' => 'required|exists:patrocinadores,id', // El patrocinador debe existir en la tabla de patrocinadores
             'reto_id' => 'required|exists:retos,id', // El reto debe existir en la tabla de retos
             'ong_id' => 'required|exists:ongs,id', // La ONG debe existir en la tabla de ongs
             'publicacion_id' => 'required|exists:publicaciones,id', // La publicación debe existir en la tabla de publicaciones
             'pabellon_id' => 'required|exists:pabellones,id', // El pabellón debe existir en la tabla de pabellones
        ];
    }
    public function messages()
    {
        return [
            'url.required' => 'La URL de la imagen es obligatoria.',
            'url.url' => 'La URL de la imagen debe ser válida.',
            'nombre.required' => 'El nombre de la imagen es obligatorio.',
            'nombre.string' => 'El nombre de la imagen debe ser una cadena de texto.',
            'nombre.max' => 'El nombre de la imagen no puede exceder los 255 caracteres.',
            'equipo_id.required' => 'El equipo es obligatorio.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',
            'jugador_id.required' => 'El jugador es obligatorio.',
            'jugador_id.exists' => 'El jugador seleccionado no existe.',
            'partido_id.required' => 'El partido es obligatorio.',
            'partido_id.exists' => 'El partido seleccionado no existe.',
            'patrocinador_id.required' => 'El patrocinador es obligatorio.',
            'patrocinador_id.exists' => 'El patrocinador seleccionado no existe.',
            'reto_id.required' => 'El reto es obligatorio.',
            'reto_id.exists' => 'El reto seleccionado no existe.',
            'ong_id.required' => 'La ONG es obligatoria.',
            'ong_id.exists' => 'La ONG seleccionada no existe.',
            'publicacion_id.required' => 'La publicación es obligatoria.',
            'publicacion_id.exists' => 'La publicación seleccionada no existe.',
            'pabellon_id.required' => 'El pabellón es obligatorio.',
            'pabellon_id.exists' => 'El pabellón seleccionado no existe.',
        ];
    }
}
