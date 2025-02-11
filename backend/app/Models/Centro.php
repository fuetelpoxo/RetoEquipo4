<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Centro extends Model
{
    protected $table = 'centros';
    protected $fillable = [
        'nombre'
    ];

    // Relación con Equipos (un centro tiene muchos equipos)
    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'centro_id');
    }

    // Relación con Estudios (un centro tiene muchos estudios)
    public function estudios()
    {
        return $this->hasMany(Estudio::class, 'centro_id');
    }
}
