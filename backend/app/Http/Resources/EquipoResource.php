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
            'centro_id' => new CentroResource($this->whenLoaded('centro')), // Centro al que pertenece el equipo
            'jugadores' => JugadorResource::collection($this->whenLoaded('jugadores')), // Lista de jugadores
            'inscripciones' => InscripcionResource::collection($this->whenLoaded('inscripciones')), // Lista de inscripciones
            'partidos' => PartidoResource::collection($this->whenLoaded('partidos')), // Lista de partidos
            'patrocinadores' => PatrocinadorEquipoResource::collection($this->whenLoaded('patrocinadores')), // Lista de patrocinadores
            'publicaciones' => PublicacionResource::collection($this->whenLoaded('publicaciones')), // Lista de publicaciones
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')), // Lista de imágenes
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
