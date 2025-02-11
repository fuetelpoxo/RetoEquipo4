<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acta extends Model
{
    protected $fillable = [
        'partido_id',
        'jugador_id',
        'incidencia',
        'hora',
        'comentario',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
}
