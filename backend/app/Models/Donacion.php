<?php

declare(strict_types = 1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donacion extends Model
{
    protected $table = 'donaciones';
    protected $fillable = [
        'ong_id',
        'kilos',
        'importe',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion',
    ];

    // Relación con Ong
    public function ong()
    {
        return $this->belongsTo(Ong::class, 'ong_id');
    }

    // Relación con Usuario para el creador
    public function usuarioCreacion()
    {
        return $this->belongsTo(Usuario::class, 'usuarioIdCreacion');
    }

    // Relación con Usuario para el actualizador
    public function usuarioActualizacion()
    {
        return $this->belongsTo(Usuario::class, 'usuarioIdActualizacion');
    }
}
