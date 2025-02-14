<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
class Jugador extends Model
{
    protected $table = 'jugadores';
    
    protected const TIPOS = ['jugador', 'entrenador', 'capitan'];

    protected $fillable = [
        'equipo_id',
        'nombre',
        'apellido1',
        'apellido2',
        'tipo',
        'estudio_id',
        'dni',
        'email',
        'telefono',
    ];
    
    // Relación con Actas (un jugador puede tener muchas actas)
    public function actas()
    {
        return $this->hasMany(Acta::class, 'jugador_id');
    }

    // Relación con Imagenes (un jugador puede tener muchas imágenes)
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'jugador_id');
    }

    // Relación con Publicaciones (un jugador puede tener muchas publicaciones)
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'jugador_id');
    }

    // Relación con Equipo (un jugador pertenece a un equipo)
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    // Relación con Estudio (un jugador pertenece a un estudio)
    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'estudio_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = Auth::id() ?? 1;
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id() ?? 1;
            $model->fechaActualizacion = now();
        });
    }

}
