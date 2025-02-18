<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstudioResource extends JsonResource
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
            'curso' => $this->curso,
            'centro' => new CentroResource($this->whenLoaded('centro')), // Centro al que pertenece el estudio
            'ciclo' => new CicloResource($this->whenLoaded('ciclo')), // Ciclo al que pertenece el estudio
            'retos' => RetoResource::collection($this->whenLoaded('retos')), // Lista de retos asociados
            'jugadores' => JugadorResource::collection($this->whenLoaded('jugadores')), // Lista de jugadores en este estudio
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
