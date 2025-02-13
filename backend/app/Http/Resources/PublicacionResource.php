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
            'imagenes' => ImagenResource::collection($this->imagenes),
            'equipo' => new EquipoResource($this->equipo),
            'partido' => new PartidoResource($this->partido),
            'patrocinador' => new PatrocinadorResource($this->patrocinador),
            'jugador' => new JugadorResource($this->jugador),
            'reto' => new RetoResource($this->reto),
            'ong' => new OngResource($this->ong),
            'pabellon' => new PabellonResource($this->pabellon),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
