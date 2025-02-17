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
    /**
     * @OA\Schema(
     *     schema="JugadorResponse",
     *     title="Jugador Response",
     *     description="Estructura de respuesta de un jugador",
     *     @OA\Property(property="id", type="integer", example=1),
     *     @OA\Property(property="equipo_id", type="integer", example=1),
     *     @OA\Property(property="nombre", type="string", example="Juan"),
     *     @OA\Property(property="apellido1", type="string", example="Pérez"),
     *     @OA\Property(property="apellido2", type="string", example="Gómez"),
     *     @OA\Property(property="tipo", type="string", enum={"futbolista", "entrenador"}, example="futbolista"),
     *     @OA\Property(property="estudio_id", type="integer", example=2),
     *     @OA\Property(property="dni", type="string", example="12345678A"),
     *     @OA\Property(property="email", type="string", format="email", example="juan.perez@example.com"),
     *     @OA\Property(property="telefono", type="string", example="123456789"),
     *     @OA\Property(property="usuarioIdCreacion", type="integer", example=1),
     *     @OA\Property(property="fechaCreacion", type="string", format="date-time", example="2025-02-12T12:00:00"),
     *     @OA\Property(property="usuarioIdActualizacion", type="integer", example=1),
     *     @OA\Property(property="fechaActualizacion", type="string", format="date-time", example="2025-02-12T12:00:00"),
     *     @OA\Property(property="equipo", ref="#/components/schemas/EquipoResponse"),
     *     @OA\Property(property="estudio", ref="#/components/schemas/EstudioResponse"),
     *     @OA\Property(property="actas", type="array", @OA\Items(ref="#/components/schemas/ActaResponse")),
     *     @OA\Property(property="imagenes", type="array", @OA\Items(ref="#/components/schemas/ImagenResponse")),
     *     @OA\Property(property="publicaciones", type="array", @OA\Items(ref="#/components/schemas/PublicacionResponse")),
     * )
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,  // ID del jugador
            'equipo_id' => $this->equipo_id,  // ID del equipo del jugador
            'nombre' => $this->nombre,  // Nombre del jugador
            'apellido1' => $this->apellido1,  // Primer apellido del jugador
            'apellido2' => $this->apellido2,  // Segundo apellido del jugador
            'tipo' => $this->tipo,  // Tipo de jugador (futbolista, entrenador, etc.)
            'estudio_id' => $this->estudio_id,  // ID del estudio del jugador
            'dni' => $this->dni,  // DNI del jugador
            'email' => $this->email,  // Correo electrónico del jugador
            'telefono' => $this->telefono,  // Teléfono del jugador
            'usuarioIdCreacion' => $this->usuarioIdCreacion,  // Usuario que creó el registro
            'fechaCreacion' => $this->fechaCreacion,  // Fecha de creación del jugador
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,  // Usuario que actualizó el registro
            'fechaActualizacion' => $this->fechaActualizacion,  // Fecha de última actualización
            'equipo' => new EquipoResource($this->whenLoaded('equipo')),  // Relación con el equipo (devuelve solo un objeto)
            'estudio' => new EstudioResource($this->whenLoaded('estudio')),  // Relación con el estudio
            'actas' => ActaResource::collection($this->whenLoaded('actas')),  // Relación con las actas
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')),  // Relación con las imágenes
            'publicaciones' => PublicacionResource::collection($this->whenLoaded('publicaciones')),  // Relación con las publicaciones
        ];
    }
}
