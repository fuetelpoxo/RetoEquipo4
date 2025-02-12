<?php

declare(strict_types = 1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acta extends Model
{
    protected $table = 'actas';
    protected $fillable = [
        'partido_id',
        'jugador_id',
        'incidencia',
        'hora',
        'comentario',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion',
    ];

    // Relación con Partido (un acta pertenece a un partido)
    public function partido()
    {
        return $this->belongsTo(Partido::class, 'partido_id');
    }

    // Relación con Jugador (un acta pertenece a un jugador)
    public function jugador()
    {
        return $this->belongsTo(Jugador::class, 'jugador_id');
    }
}
