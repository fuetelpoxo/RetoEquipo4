<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
class PatrocinadorEquipo extends Model
{
    protected $table = 'patrocinadores_equipos';
    protected $fillable = [
        'equipo_id',
        'patrocinador_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    // Relación con Patrocinador (Uno a muchos inverso)
    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class, 'patrocinador_id');
    }

    // Relación con Equipo (Uno a muchos inverso)
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = Auth::id();
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id();
            $model->fechaActualizacion = now();
        });
    }
}
