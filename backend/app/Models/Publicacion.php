<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    //Inlcuimos las propiedades para poder llenarlas masivamente luego

    protected $fillable = [
        'titulo',
        'texto',
        'portada',
        'rutavideo',
        'rutaaudio',
        'equipo_id',
        'partido_id',
        'patrocinador_id',
        'jugador_id',
        'reto_id',
        'ong_id',
        'pabellon_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = auth()->id();
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = auth()->id();
            $model->fechaActualizacion = now();
        });
    }
    //Relacion con imagen
    public function imagenes()
    {
        return $this->hasMany(Imagen::class);
    }
    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function reto()
    {
        return $this->belongsTo(Reto::class);
    }

    public function ong()
    {
        return $this->belongsTo(Ong::class);
    }

    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class);
    }
}
