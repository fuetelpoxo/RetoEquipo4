<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatrocinadorEquipo extends Model
{
      //Inlcuimos las propiedades para poder llenarlas masivamente luego

    protected $fillable = [
        'equipo_id',
        'patrocinador_id',
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
}
