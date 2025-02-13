<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscripcionResource extends JsonResource
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
            'comentarios' => $this->comentarios,
            'estado' => $this->estado,
            'equipo' => new EquipoResource($this->whenLoaded('equipo')),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
