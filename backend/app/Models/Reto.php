<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reto extends Model
{
    protected $table = 'retos';
    protected $fillable = [
        'titulo',
        'texto',
        'estudio_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
    // Relación con Estudio (un reto pertenece a un estudio)
    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'estudio_id');
    }

    // Relación con Imágenes (un reto tiene muchas imágenes)
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'reto_id');
    }

    // Relación con Publicaciones (un reto tiene muchas publicaciones)
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'reto_id');
    }
}
