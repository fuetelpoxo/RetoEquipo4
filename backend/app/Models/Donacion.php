<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 * schema="donaciones",
 * type="object",
 * title="Donaciones",
 * @OA\Property(property="ong_id", type="integer", example="1"),
 * @OA\Property(property="kilos", type="integer", example="10"),
 * @OA\Property(property="importe", type="integer", example="100"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
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
