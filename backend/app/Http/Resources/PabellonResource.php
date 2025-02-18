<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PabellonResource extends JsonResource
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
            'direccion' => $this->direccion,
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')),
            'publicaciones' => PublicacionResource::collection($this->whenLoaded('publicaciones')),
            'partidos' => PartidoResource::collection($this->whenLoaded('partidos')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
