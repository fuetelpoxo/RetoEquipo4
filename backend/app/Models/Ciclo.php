<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{
    protected $fillable = [
        'id',
        'nombre',
        'familia_id',
    ];
}
