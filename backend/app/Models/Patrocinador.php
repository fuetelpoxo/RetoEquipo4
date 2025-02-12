<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
    public function usuarioCreacion()
    {
        return $this->belongsTo(Usuario::class, 'usuarioIdCreacion');
    }

    // Relación con Usuario (Actualizador)
    public function usuarioActualizacion()
    {
        return $this->belongsTo(Usuario::class, 'usuarioIdActualizacion');
    }

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
}
