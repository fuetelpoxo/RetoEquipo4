<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *  schema="actas",
 *  type="object",
 *  title="Actas",
 *  @OA\Property(property="partido_id", type="integer", example="1"),
 *  @OA\Property(property="jugador_id", type="integer", example="1"),
 * @OA\Property(property="incidencia", type="string", example="amarilla"),
 * @OA\Property(property="hora", type="time", example="12:00:00"),
 * @OA\Property(property="comentario", type="string", example="Comentario"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 *  )
 */
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
        'fechaActualizacion'
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
