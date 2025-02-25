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
            "id"=> $this->id,
            "centro_id"=> $this->centro_id,
            "ciclo_id"=> $this->ciclo_id,
            "curso"=> $this->curso,
            "centro"=> new CentroResource($this->whenLoaded('centro')),
            'ciclo' => new CicloResource($this->whenLoaded('ciclo')),
            'retos' => RetoResource::collection($this->whenLoaded('retos')),
            'jugadores' => JugadorResource::collection($this->whenLoaded('jugadores')),
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,

        ];
    }
}
