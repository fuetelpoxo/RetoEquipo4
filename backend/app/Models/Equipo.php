<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *  schema="equipos",
 *  type="object",
 *  title="equipos",
 * @OA\Property(property="nombre", type="string", example="Equipo 1"),
 * @OA\Property(property="centro_id", type="integer", example="1"),
 * @OA\Property(property="grupo", type="string", example="A"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 *  )
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
