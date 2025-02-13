<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
/**
 * @OA\Schema(
 *     schema="UserResponse",
 *     title="User Response",
 *     description="Estructura de respuesta de un usuario",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Borja Falque"),
 *     @OA\Property(property="email", type="string", format="email", example="borja@example.com"),
 *     @OA\Property(property="perfil", type="string", enum={"entrenador", "director", "periodista", "administrador"}, example="administrador"),
 *     @OA\Property(property="activo", type="boolean", example=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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
