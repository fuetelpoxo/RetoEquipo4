<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
class Partido extends Model
{
    protected $table = 'partidos';
    protected $fillable = [
        'equipoL_id',
        'equipoV_id',
        'fecha',
        'hora',
        'golesL',
        'golesV',
        'pabellon_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    // Relación con Actas (un partido tiene muchas actas)
    public function actas()
    {
        return $this->hasMany(Acta::class, 'partido_id');
    }

    // Relación con Equipos (un partido pertenece a dos equipos)
    public function equipoLocal()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    public function equipoVisitante()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    // Relación con Publicaciones (un partido tiene muchas publicaciones)
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'partido_id');
    }

    // Relación con Imágenes (un partido tiene muchas imágenes)
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'partido_id');
    }

    // Relación con Pabellón (un partido pertenece a un pabellón)
    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class, 'pabellon_id');
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
