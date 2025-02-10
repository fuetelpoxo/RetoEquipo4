<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    protected $fillable = [
        'id',
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
}
