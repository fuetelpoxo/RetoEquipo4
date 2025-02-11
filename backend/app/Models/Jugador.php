<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    protected $fillable = [
        'equipo_id',
        'nombre',
        'apellido1',
        'apellido2',
        'tipo',
        'estudio_id',
        'dni',
        'email',
        'telefono',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
}
