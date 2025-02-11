<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    protected $table = 'jugadores';
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
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
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
    
}
