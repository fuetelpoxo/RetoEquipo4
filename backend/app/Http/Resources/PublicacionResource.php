<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicacionResource extends JsonResource
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
            'titulo' => $this->titulo,
            'texto' => $this->texto,
            'portada' => $this->portada,
            'rutavideo' => $this->rutavideo,
            'rutaaudio' => $this->rutaaudio,
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')),
            'equipo' => new EquipoResource($this->whenLoaded('equipo')),
            'partido' => new PartidoResource($this->whenLoaded('partido')),
            'patrocinador' => new PatrocinadorResource($this->whenLoaded('patrocinador')),
            'jugador' => new JugadorResource($this->whenLoaded('jugador')),
            'reto' => new RetoResource($this->whenLoaded('jugador')),
            'ong' => new OngResource($this->whenLoaded('ong')),
            'pabellon' => new PabellonResource($this->whenLoaded('pabellon')),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
