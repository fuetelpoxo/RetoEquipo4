<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pabellon extends Model
{
    //Inlcuimos las propiedades para poder llenarlas masivamente luego

    protected $fillable = [
        'nombre',
        'direccion'
    ];
    // Relación con Publicacion
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class);
    }
    //Relacion con imagen
    public function imagenes()
    {
        return $this->hasMany(Imagen::class);
    }
}
