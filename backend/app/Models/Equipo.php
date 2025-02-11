<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
      //Inlcuimos las propiedades para poder llenarlas masivamente luego

    protected $fillable = [
        'nombre',
        'centro_id',
        'grupo',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
    protected static function boot(){
        parent::boot();

        static::creating(function($model){
            $model->usuarioIdCreacion = auth()->id();
            $model->fechaCreacion = now();
        });

        static::updating(function($model){
            $model->usuarioIdActualizacion = auth()->id();
            $model->fechaActualizacion = now();
        });
    }
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
