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
            'equipoL' => new EquipoResource($this->whenLoaded('equipoL')), // Representación del equipo local
            'equipoV' => new EquipoResource($this->whenLoaded('equipoV')), // Representación del equipo visitante
            'fecha'=> $this->fecha,
            'hora'=> $this->hora,
            'golesL'=> $this->golesL,
            'golesV'=> $this->golesV,
            'pabellon_id'=> new PabellonResource($this->whenLoaded('pabellon')), // Incluir la relación con el pabellón
            'usuarioIdCreacion'=> $this->usuarioIdCreacion,
            'fechaCreacion'=> $this->fechaCreacion,
            'usuarioIdActualizacion'=> $this->usuarioIdActualizacion,
            'fechaActualizacion'=> $this->fechaActualizacion,
            'actas'=> ActaResource::collection($this->whenLoaded('actas')), // Incluir la relación con las actas
        ];
    }
}
