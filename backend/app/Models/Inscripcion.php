<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = Auth::id()?? 1;
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id()?? 1;
            $model->fechaActualizacion = now();
        });
    }
}
