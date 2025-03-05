<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
/**
 * @OA\Schema(
 * schema="jugadores",
 * type="object",
 * title="jugadores",
 * @OA\Property(property="equipo_id", type="integer", example="1"),
 * @OA\Property(property="nombre", type="string", example="Juan"),
 * @OA\Property(property="apellido1", type="string", example="Perez"),
 * @OA\Property(property="apellido2", type="string", example="Gomez"),
 * @OA\Property(property="tipo", type="string", example="jugador"),
 * @OA\Property(property="estudio_id", type="integer", example="1"),
 * @OA\Property(property="dni", type="string", example="12345678A"),
 * @OA\Property(property="email", type="string", example="juan@example.com"),
 * @OA\Property(property="telefono", type="string", example="123456789"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 * )
 */
class Jugador extends Model
{
    protected $table = 'jugadores';

    public const TIPOS = [
        'JUGADOR' => 'jugador',
        'ENTRENADOR' => 'entrenador',
        'CAPITAN' => 'capitan',
    ];
    protected $fillable = [
        'equipo_id',
        'nombre',
        'apellido1',
        'apellido2',
        'tipo',
        'estudio_id',
        'dni',
        'email',
        'telefono',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
    // Relación con Actas (un jugador puede tener muchas actas)
    public function actas()
    {
        return $this->hasMany(Acta::class, 'jugador_id');
    }

    // Relación con Imagenes (un jugador puede tener muchas imágenes)
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'jugador_id');
    }

    // Relación con Publicaciones (un jugador puede tener muchas publicaciones)
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'jugador_id');
    }

    // Relación con Equipo (un jugador pertenece a un equipo)
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    // Relación con Estudio (un jugador pertenece a un estudio)
    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'estudio_id');
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
