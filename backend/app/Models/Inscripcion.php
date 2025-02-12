<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    protected $table = 'inscripciones';
    protected $fillable = [
        'comentarios',
        'estado',
        'equipo_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
}
