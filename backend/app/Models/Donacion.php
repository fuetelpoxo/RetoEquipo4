<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Donacion",
 *     required={"ong_id", "kilos", "importe", "usuarioIdCreacion", "fechaCreacion", "usuarioIdActualizacion", "fechaActualizacion"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="ong_id", type="integer", example=2, description="ID de la ONG asociada"),
 *     @OA\Property(property="kilos", type="integer", example=100, description="Cantidad de kilos donados"),
 *     @OA\Property(property="importe", type="number", format="float", example=150.50, description="Importe de la donación"),
 *     @OA\Property(property="usuarioIdCreacion", type="integer", example=1, description="ID del usuario que creó la donación"),
 *     @OA\Property(property="fechaCreacion", type="string", format="date-time", example="2025-02-14T12:00:00", description="Fecha y hora de creación de la donación"),
 *     @OA\Property(property="usuarioIdActualizacion", type="integer", example=1, description="ID del usuario que actualizó la donación"),
 *     @OA\Property(property="fechaActualizacion", type="string", format="date-time", example="2025-02-14T12:30:00", description="Fecha y hora de la última actualización de la donación"),
 *     @OA\Property(property="ong", type="object", ref="#/components/schemas/Ong", description="Relación con la ONG asociada")
 * )
 */
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
        'fechaActualizacion'
    ];

    // Relación con Ong
    /**
     * @OA\Property(ref="#/components/schemas/Ong")
     */
    public function ong()
    {
        return $this->belongsTo(Ong::class, 'ong_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuarioIdCreacion = Auth::id() ?? 1;
            $model->fechaCreacion = now();
        });

        static::updating(function ($model) {
            $model->usuarioIdActualizacion = Auth::id() ?? 1;
            $model->fechaActualizacion = now();
        });
    }
}
