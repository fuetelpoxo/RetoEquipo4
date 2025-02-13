<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
class Estudio extends Model
{
    protected $table = 'estudios';
    protected $fillable = [
        'centro_id',
        'ciclo_id',
        'curso',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    // Relación con Ciclo (un estudio pertenece a un ciclo)
    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'ciclo_id');
    }

    // Relación con Retos (un estudio tiene muchos retos)
    public function retos()
    {
        return $this->hasMany(Reto::class, 'estudio_id');
    }

    // Relación con Centro (un estudio pertenece a un centro)
    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    // Relación con Jugadores (un estudio tiene muchos jugadores)
    public function jugadores()
    {
        return $this->hasMany(Jugador::class, 'estudio_id');
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = Auth::id();
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id();
            $model->fechaActualizacion = now();
        });
    }
}
