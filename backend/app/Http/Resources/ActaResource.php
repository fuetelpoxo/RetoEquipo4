<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'partido_id' => $this->partido_id,
            'jugador_id' => $this->jugador_id,
            'incidencia' => $this->incidencia,
            'hora' => $this->hora,
            'comentario' => $this->comentario,
            'usuario_creacion_id' => $this->usuarioIdCreacion,
            'fecha_creacion' => $this->fechaCreacion,
            'usuario_actualizacion_id' => $this->usuarioIdActualizacion,
            'fecha_actualizacion' => $this->fechaActualizacion
        ];
    }
}
