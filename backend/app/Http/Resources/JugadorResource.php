<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JugadorResource extends JsonResource
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
            "equipo_id"=> $this->equipo_id,
            'equipo'=> new EquipoResource($this->whenLoaded('equipo')),
            "nombre"=> $this->nombre,
            "apellido1"=> $this->apellido1,
            "apellido2"=> $this->apellido2,
            "tipo"=> $this->tipo,
            "estudio_id"=> $this->estudio_id,
            'estudio'=> new EstudioResource($this->whenLoaded('estudio')),
            "dni"=> $this->dni,
            "email"=> $this->email,
            "telefono"=> $this->telefono,
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion
        ];
    }
}
