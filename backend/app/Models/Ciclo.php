<?php

declare(strict_types = 1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{
    protected $table = 'ciclos';
    protected $fillable = [
        'nombre',
        'familia_id',
    ];

    public function familias()
    {
        return $this->belongsTo(Familia::class);
    }
}
