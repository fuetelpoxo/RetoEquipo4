<?php

namespace App\Http\Requests\PublicacionRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePublicacionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules()
    {
        return [
            'titulo' => 'nullable|string|max:255',
            'texto' => 'nullable|string',
            'portada' => 'nullable|boolean',
            'rutavideo' => 'nullable|string',
            'rutaaudio' => 'nullable|string',
            'equipo_id' => 'nullable|exists:equipos,id',
            'partido_id' => 'nullable|exists:partidos,id',
            'patrocinador_id' => 'nullable|exists:patrocinadores,id',
            'jugador_id' => 'nullable|exists:jugadores,id',
            'reto_id' => 'nullable|exists:retos,id',
            'ong_id' => 'nullable|exists:ongs,id',
            'pabellon_id' => 'nullable|exists:pabellones,id',
        ];
    }
}
