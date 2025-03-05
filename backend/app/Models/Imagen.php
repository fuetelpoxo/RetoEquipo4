<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * 
 * @OA\Schema(
 * schema="imagenes",
 * type="object",
 * title="imagenes",
 * @OA\Property(property="url", type="string", example="https://www.google.com"),
 * @OA\Property(property="nombre", type="string", example="Imagen 1"),
 * @OA\Property(property="equipo_id", type="integer", example="1"),
 * @OA\Property(property="jugador_id", type="integer", example="1"),
 * @OA\Property(property="partido_id", type="integer", example="1"),
 * @OA\Property(property="patrocinador_id", type="integer", example="1"),
 * @OA\Property(property="reto_id", type="integer", example="1"),
 * @OA\Property(property="ong_id", type="integer", example="1"),
 * @OA\Property(property="publicacion_id", type="integer", example="1"),
 * @OA\Property(property="pabellon_id", type="integer", example="1"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 * )
 */
class Imagen extends Model
{
    protected $table = 'imagenes';
    protected $fillable = [
        'url',
        'nombre',
        'equipo_id',
        'jugador_id',
        'partido_id',
        'patrocinador_id',
        'reto_id',
        'ong_id',
        'publicacion_id',
        'pabellon_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];


    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }


    public function reto()
    {
        return $this->belongsTo(Reto::class);
    }

    public function ong()
    {
        return $this->belongsTo(Ong::class);
    }

    public function publicacion()
    {
        return $this->belongsTo(Publicacion::class);
    }
    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class);
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
