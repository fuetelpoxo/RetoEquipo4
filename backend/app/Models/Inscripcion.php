<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
      //Inlcuimos las propiedades para poder llenarlas masivamente luego

    protected $fillable = [
        'comentarios',
        'estado',
        'equipo_id',
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
    
    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
}
