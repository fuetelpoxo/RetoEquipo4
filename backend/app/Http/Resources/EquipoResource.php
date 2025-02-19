<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="Equipo",
 *     type="object",
 *     @OA\Property(property="id", type="integer", description="ID del equipo"),
 *     @OA\Property(property="nombre", type="string", description="Nombre del equipo"),
 *     @OA\Property(property="grupo", type="string", description="Grupo al que pertenece el equipo"),
 *     @OA\Property(property="centro_id", ref="#/components/schemas/Centro", description="Centro al que pertenece el equipo"),
 *     @OA\Property(property="jugadores", type="array", @OA\Items(ref="#/components/schemas/Jugador"), description="Lista de jugadores del equipo"),
 *     @OA\Property(property="inscripciones", type="array", @OA\Items(ref="#/components/schemas/Inscripcion"), description="Lista de inscripciones del equipo"),
 *     @OA\Property(property="partidos", type="array", @OA\Items(ref="#/components/schemas/Partido"), description="Lista de partidos del equipo"),
 *     @OA\Property(property="patrocinadores", type="array", @OA\Items(ref="#/components/schemas/PatrocinadorEquipo"), description="Lista de patrocinadores del equipo"),
 *     @OA\Property(property="publicaciones", type="array", @OA\Items(ref="#/components/schemas/Publicacion"), description="Lista de publicaciones del equipo"),
 *     @OA\Property(property="imagenes", type="array", @OA\Items(ref="#/components/schemas/Imagen"), description="Lista de imágenes asociadas al equipo"),
 *     @OA\Property(property="usuarioIdCreacion", type="integer", description="ID del usuario que creó el equipo"),
 *     @OA\Property(property="fechaCreacion", type="string", format="date-time", description="Fecha de creación del equipo"),
 *     @OA\Property(property="usuarioIdActualizacion", type="integer", description="ID del usuario que actualizó el equipo"),
 *     @OA\Property(property="fechaActualizacion", type="string", format="date-time", description="Fecha de la última actualización del equipo")
 * )
 */
class EquipoResource extends JsonResource
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
            'grupo' => $this->grupo,
            'centro_id' => new CentroResource($this->whenLoaded('centro')), // Centro al que pertenece el equipo
            'jugadores' => JugadorResource::collection($this->whenLoaded('jugadores')), // Lista de jugadores
            'inscripciones' => InscripcionResource::collection($this->whenLoaded('inscripciones')), // Lista de inscripciones
            'partidos' => PartidoResource::collection($this->whenLoaded('partidos')), // Lista de partidos
            'patrocinadores' => PatrocinadorEquipoResource::collection($this->whenLoaded('patrocinadores')), // Lista de patrocinadores
            'publicaciones' => PublicacionResource::collection($this->whenLoaded('publicaciones')), // Lista de publicaciones
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')), // Lista de imágenes
            'usuarioIdCreacion' => $this->usuarioIdCreacion,
            'fechaCreacion' => $this->fechaCreacion,
            'usuarioIdActualizacion' => $this->usuarioIdActualizacion,
            'fechaActualizacion' => $this->fechaActualizacion,
        ];
    }
}
