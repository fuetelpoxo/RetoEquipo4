<?php

declare(strict_types = 1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Familia extends Model
{
    protected $table = 'familias';
    protected $fillable = [
        'nombre',
    ];

    public function ciclos()
    {
        return $this->hasMany(Ciclo::class);
    }
}
