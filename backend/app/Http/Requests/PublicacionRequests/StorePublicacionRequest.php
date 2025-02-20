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
            'equipo_id' => 'required|exists:equipos,id',
            'partido_id' => 'required|exists:partidos,id',
            'patrocinador_id' => 'required|exists:patrocinadores,id',
            'jugador_id' => 'required|exists:jugadores,id',
            'reto_id' => 'required|exists:retos,id',
            'ong_id' => 'required|exists:ongs,id',
            'pabellon_id' => 'required|exists:pabellones,id',
        ];
    }
    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio.',
            'titulo.string' => 'El título debe ser una cadena de texto.',
            'titulo.max' => 'El título no puede exceder los 255 caracteres.',
            'texto.required' => 'El texto es obligatorio.',
            'portada.boolean' => 'El valor de portada debe ser un valor booleano.',
            'rutavideo.url' => 'La URL del video debe ser válida.',
            'rutaaudio.url' => 'La URL del audio debe ser válida.',
            'equipo_id.required' => 'El equipo es obligatorio.',
            'equipo_id.exists' => 'El equipo seleccionado debe existir en la tabla de equipos.',
            'partido_id.required' => 'El partido es obligatorio.',
            'partido_id.exists' => 'El partido seleccionado debe existir en la tabla de partidos.',
            'patrocinador_id.required' => 'El patrocinador es obligatorio.',
            'patrocinador_id.exists' => 'El patrocinador seleccionado debe existir en la tabla de patrocinadores.',
            'jugador_id.required' => 'El jugador es obligatorio.',
            'jugador_id.exists' => 'El jugador seleccionado debe existir en la tabla de jugadores.',
            'reto_id.required' => 'El reto es obligatorio.',
            'reto_id.exists' => 'El reto seleccionado debe existir en la tabla de retos.',
            'ong_id.required' => 'La ONG es obligatoria.',
            'ong_id.exists' => 'La ONG seleccionada debe existir en la tabla de ONGs.',
            'pabellon_id.required' => 'El pabellón es obligatorio.',
            'pabellon_id.exists' => 'El pabellón seleccionado debe existir en la tabla de pabellones.',
        ];
    }
}