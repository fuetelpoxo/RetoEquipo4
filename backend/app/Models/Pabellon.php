<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pabellon extends Model
{
    protected $table = 'pabellones';
    protected $fillable = [
        'nombre',
        'direccion'
    ];
// Relación con Imágenes (un pabellón tiene muchas imágenes)
public function imagenes()
{
    return $this->hasMany(Imagen::class, 'pabellon_id');
}

// Relación con Publicaciones (un pabellón tiene muchas publicaciones)
public function publicaciones()
{
    return $this->hasMany(Publicacion::class, 'pabellon_id');
}

// Relación con Partidos (un pabellón tiene muchos partidos)
public function partidos()
{
    return $this->hasMany(Partido::class, 'pabellon_id');
}
    
}
