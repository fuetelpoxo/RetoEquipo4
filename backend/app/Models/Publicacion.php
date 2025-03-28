<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
/**
 * @OA\Schema(
 * schema="publicaciones",
 * type="object",
 * title="publicaciones",
 * @OA\Property(property="titulo", type="string", example="Titulo"),
 * @OA\Property(property="texto", type="string", example="Texto"),
 * @OA\Property(property="portada", type="string", example="https://www.google.com"),
 * @OA\Property(property="rutavideo", type="string", example="https://www.google.com"),
 * @OA\Property(property="rutaaudio", type="string", example="https://www.google.com"),
 * @OA\Property(property="equipo_id", type="integer", example="1"),
 * @OA\Property(property="partido_id", type="integer", example="1"),
 * @OA\Property(property="patrocinador_id", type="integer", example="1"),
 * @OA\Property(property="jugador_id", type="integer", example="1"),
 * @OA\Property(property="reto_id", type="integer", example="1"),
 * @OA\Property(property="ong_id", type="integer", example="1"),
 * @OA\Property(property="pabellon_id", type="integer", example="1"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 * )
 */
class Publicacion extends Model
{
    protected $table = 'publicaciones';
    protected $fillable = [
        'titulo',
        'texto',
        'portada',
        'rutavideo',
        'rutaaudio',
        'equipo_id',
        'partido_id',
        'patrocinador_id',
        'jugador_id',
        'reto_id',
        'ong_id',
        'pabellon_id',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];

    public function imagenes()
    {
        return $this->hasMany(Imagen::class);
    }
    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function reto()
    {
        return $this->belongsTo(Reto::class);
    }

    public function ong()
    {
        return $this->belongsTo(Ong::class);
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
