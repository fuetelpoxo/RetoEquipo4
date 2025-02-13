<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatrocinadorResource extends JsonResource
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
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
            'equipos' => EquipoResource::collection($this->equipos),  // Relación con equipos
            'publicaciones' => PublicacionResource::collection($this->publicaciones), // Relación con publicaciones
            'imagenes' => ImagenResource::collection($this->imagenes), // Relación con imágenes
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
