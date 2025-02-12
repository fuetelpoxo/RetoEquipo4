<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
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

    // Relación con Partidos (un equipo tiene muchos partidos)
    public function partidos()
    {
        return $this->hasMany(Partido::class, 'equipoL_id')->orWhere('equipoV_id', $this->id);
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
            $model->usuarioIdCreacion = Auth::id();
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id();
            $model->fechaActualizacion = now();
        });
    }
}
