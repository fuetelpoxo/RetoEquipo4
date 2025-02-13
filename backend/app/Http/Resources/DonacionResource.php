<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonacionResource extends JsonResource
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
            'ong' => new OngResource($this->ong), // Relación con ONG
            'kilos' => $this->kilos,
            'importe' => $this->importe,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
