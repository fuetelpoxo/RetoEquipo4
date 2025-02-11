<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patrocinador extends Model
{
    protected $fillable = [
        'nombre',
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
