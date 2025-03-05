<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,  // ID del usuario
            'name' => $this->name,  // Nombre del usuario
            'email' => $this->email,  // Correo electrónico del usuario
            'email_verified_at' => $this->email_verified_at,  // Fecha de verificación del email
            'activo' => $this->activo,  // Estado de actividad del usuario
            'perfil' => $this->perfil,  // Perfil del usuario
            'created_at' => $this->created_at,  // Fecha de creación
            'updated_at' => $this->updated_at,  // Fecha de última actualización
        ];
    }
}
