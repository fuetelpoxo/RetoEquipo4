<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CentroResource extends JsonResource
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
            'equipos' => EquipoResource::collection($this->whenLoaded('equipos')),
            'estudios' => EstudioResource::collection($this->whenLoaded('estudios')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
