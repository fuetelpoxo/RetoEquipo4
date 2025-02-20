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
            'equipoL_id' => $this->equipoL_id,
            'equipoL' => new EquipoResource($this->equipoLocal), // Representación del equipo local
            'equipoV_id' => $this->equipoV_id,
            'equipoV' => new EquipoResource($this->equipoVisitante), // Representación del equipo visitante
            'fecha'=> $this->fecha,
            'hora'=> $this->hora,
            'golesL'=> $this->golesL,
            'golesV'=> $this->golesV,
            'pabellon'=> new PabellonResource($this->pabellon), // Incluir la relación con el pabellón
            'usuarioIdCreacion'=> $this->usuarioIdCreacion,
            'fechaCreacion'=> $this->fechaCreacion,
            'usuarioIdActualizacion'=> $this->usuarioIdActualizacion,
            'fechaActualizacion'=> $this->fechaActualizacion,
            'actas'=> ActaResource::collection($this->whenLoaded('actas')), // Incluir la relación con las actas
        ];
    }
}
