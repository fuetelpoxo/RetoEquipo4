<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

}
