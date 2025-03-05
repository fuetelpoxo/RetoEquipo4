<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
/**
 * @OA\Schema(
 * schema="patrocinadores",
 * type="object",
 * title="patrocinadores",
 * @OA\Property(property="nombre", type="string", example="Patrocinador 1"),
 * @OA\Property(property="usuarioIdCreacion", type="integer", example="1"),
 * @OA\Property(property="fechaCreacion", type="timestamp", example="2022-02-11 15:12:24"),
 * @OA\Property(property="usuarioIdActualizacion", type="integer", example="1"),
 * @OA\Property(property="fechaActualizacion", type="timestamp", example="2022-02-11 15:12:24")
 * )
 */
class Patrocinador extends Model
{
    protected $table = 'patrocinadores';
    protected $fillable = [
        'nombre',
        'usuarioIdCreacion',
        'fechaCreacion',
        'usuarioIdActualizacion',
        'fechaActualizacion'
    ];
    // Relación con Usuario (Creador)


    // Relación con Publicaciones (Un patrocinador puede tener muchas publicaciones)
    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'patrocinador_id');
    }

    // Relación con Imagenes (Un patrocinador puede tener muchas imágenes)
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'patrocinador_id');
    }

    // Relación con Equipos (Muchos a muchos)
    public function equipos()
    {
        return $this->belongsToMany(Equipo::class, 'patrocinadores_equipo', 'patrocinador_id', 'equipo_id');
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
