<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ong extends Model
{
    protected $table = 'ongs';
    protected $fillable = [
        'nombre',
        'landingPage'
    ];

    public function donaciones()
    {
        return $this->hasMany(Donacion::class);
    }
}
