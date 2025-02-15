<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImagenResource extends JsonResource
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
            'url' => $this->url,
            'nombre' => $this->nombre,
            'equipo' => new EquipoResource($this->whenLoaded('equipo')),
            'jugador' => new JugadorResource($this->whenLoaded('jugador')),
            'partido' => new PartidoResource($this->whenLoaded('partido')),
            'patrocinador' => new PatrocinadorResource($this->whenLoaded('partido')),
            'reto' => new RetoResource($this->whenLoaded('reto')),
            'ong' => new OngResource($this->whenLoaded('ong')),
            'publicacion' => new PublicacionResource($this->whenLoaded('publicacion')),
            'pabellon' => new PabellonResource($this->whenLoaded('pabellon')),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
