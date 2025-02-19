<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DonacionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'kilos' => $this->kilos,
            'importe' => $this->importe,
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
            'ong' => new OngResource($this->whenLoaded('ong_id')), // Incluir la relación con la ONG
        ];
    }
}
