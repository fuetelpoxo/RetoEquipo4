<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Imagen extends Model
{
    protected $table = 'imagenes';
    protected $fillable = [
        'url',
        'nombre',
        'equipo_id',
        'jugador_id',
        'partido_id',
        'patrocinador_id',
        'reto_id',
        'ong_id',
        'publicacion_id',
        'pabellon_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($model) {
    //         $model->usuarioIdCreacion = auth()->id();
    //         $model->fechaCreacion = now();
    //     });

    //     static::updating(function ($model) {
    //         $model->usuarioIdActualizacion = auth()->id();
    //         $model->fechaActualizacion = now();
    //     });
    // }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }


    public function reto()
    {
        return $this->belongsTo(Reto::class);
    }

    public function ong()
    {
        return $this->belongsTo(Ong::class);
    }

    public function publicacion()
    {
        return $this->belongsTo(Publicacion::class);
    }
    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class);
    }
}
