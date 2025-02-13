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
            'equipo' => new EquipoResource($this->equipo),
            'jugador' => new JugadorResource($this->jugador),
            'partido' => new PartidoResource($this->partido),
            'patrocinador' => new PatrocinadorResource($this->patrocinador),
            'reto' => new RetoResource($this->reto),
            'ong' => new OngResource($this->ong),
            'publicacion' => new PublicacionResource($this->publicacion),
            'pabellon' => new PabellonResource($this->pabellon),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
