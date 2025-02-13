<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartidoResource extends JsonResource
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
            'equipo_local' => new EquipoResource($this->equipoLocal),
            'equipo_visitante' => new EquipoResource($this->equipoVisitante),
            'fecha' => $this->fecha,
            'hora' => $this->hora,
            'goles_local' => $this->golesL,
            'goles_visitante' => $this->golesV,
            'pabellon' => new PabellonResource($this->pabellon),
            'actas' => ActaResource::collection($this->whenLoaded('actas')),
            'publicaciones' => PublicacionResource::collection($this->whenLoaded('publicaciones')),
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
