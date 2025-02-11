<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    protected $fillable = [
        'equipoL_id',
        'equipoV_id',
        'fecha',
        'hora',
        'golesL',
        'golesV',
        'pabellon_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
}
