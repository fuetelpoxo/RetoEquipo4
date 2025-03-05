<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipoResource extends JsonResource
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
            'nombre' => $this->nombre,
            'grupo' => $this->grupo,
            'centro_id' => $this->centro_id, // Primero 'centro_id'
            'centro' => new CentroResource($this->whenLoaded('centro')), // Luego 'centro' como relación
            'jugadores' => JugadorResource::collection($this->whenLoaded('jugadores')),
            'inscripciones' => InscripcionResource::collection($this->whenLoaded('inscripciones')),
            'partidos' => PartidoResource::collection($this->whenLoaded('partidos')),
            'patrocinadores' => PatrocinadorEquipoResource::collection($this->whenLoaded('patrocinadores')),
            'publicaciones' => PublicacionResource::collection($this->whenLoaded('publicaciones')),
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }

}
