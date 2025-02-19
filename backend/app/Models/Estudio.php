<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
/**
 * @OA\Schema(
 * schema="estudios",
 * type="object",
 * title="estudios",
 * @OA\Property(property="centro_id", type="integer", example="1"),
 * @OA\Property(property="ciclo_id", type="integer", example="1"),
 * @OA\Property(property="curso", type="string", example="2022-2023"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 * )
 */
class Estudio extends Model
{
    protected $table = 'estudios';
    protected $fillable = [
        'centro_id',
        'ciclo_id',
        'curso'
    ];

    // Relación con Retos (un estudio tiene muchos retos)
    public function retos()
    {
        return $this->hasMany(Reto::class, 'estudio_id');
    }

    // Relación con Centro (un estudio pertenece a un centro)
    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    // Relación con Jugadores (un estudio tiene muchos jugadores)
    public function jugadores()
    {
        return $this->hasMany(Jugador::class, 'estudio_id');
    }
    
}
