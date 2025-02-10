<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pabellon extends Model
{
    protected $fillable = [
        'id',
        'nombre',
        'direccion'
    ];
}
