<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *     schema="Equipo",
 *     required={"nombre", "centro_id", "grupo"},
 *     @OA\Property(property="id", type="integer", description="ID del equipo"),
 *     @OA\Property(property="nombre", type="string", description="Nombre del equipo"),
 *     @OA\Property(property="centro_id", type="integer", description="ID del centro al que pertenece el equipo"),
 *     @OA\Property(property="grupo", type="string", description="Grupo al que pertenece el equipo"),
 *     @OA\Property(property="usuarioIdCreacion", type="integer", description="ID del usuario que creó el equipo"),
 *     @OA\Property(property="fechaCreacion", type="string", format="date-time", description="Fecha de creación del equipo"),
 *     @OA\Property(property="usuarioIdActualizacion", type="integer", description="ID del usuario que actualizó el equipo"),
 *     @OA\Property(property="fechaActualizacion", type="string", format="date-time", description="Fecha de actualización del equipo")
 * )
 */
class Equipo extends Model
{
    protected $table = 'equipos';
    protected $fillable = [
        'nombre',
        'centro_id',
        'grupo',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    // Relación con Centro (un equipo pertenece a un centro)
    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    // Relación con Inscripciones (un equipo tiene muchas inscripciones)
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'equipo_id');
    }

    // Relación con Jugadores (un equipo tiene muchos jugadores)
    public function jugadores()
    {
        return $this->hasMany(Jugador::class, 'equipo_id');
    }

    // Relación con Partidos (un equipo tiene muchos partidos como local)
    public function partidosLocal()
    {
        return $this->hasMany(Partido::class, 'equipoL_id');
    }

    // Relación con Partidos (un equipo tiene muchos partidos como visitante)
    public function partidosVisitante()
    {
        return $this->hasMany(Partido::class, 'equipoV_id');
    }

    // Relación con Patrocinadores-Equipos (un equipo tiene muchos patrocinadores)
    public function patrocinadores()
    {
        return $this->hasMany(PatrocinadorEquipo::class, 'equipo_id');
    }

    // Relación con Publicaciones (un equipo tiene muchas publicaciones)
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'equipo_id');
    }

    // Relación con Imágenes (un equipo tiene muchas imágenes)
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'equipo_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = Auth::id()?? 1;
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id()?? 1;
            $model->fechaActualizacion = now();
        });
    }
}
