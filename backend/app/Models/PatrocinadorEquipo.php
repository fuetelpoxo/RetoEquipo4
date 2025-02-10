<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatrocinadorEquipo extends Model
{
    protected $fillable = [
        'id',
        'equipo_id',
        'patrocinador_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
}
