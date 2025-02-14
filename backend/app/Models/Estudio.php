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
        'curso'
    ];

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
    
}
