<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ong extends Model
{
    protected $fillable = [
        'id',
        'nombre',
        'landingPage'
    ];
}
