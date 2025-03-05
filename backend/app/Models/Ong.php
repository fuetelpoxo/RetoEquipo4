<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *  schema="ongs",
 *  type="object",
 *  title="Ongs",
 *  @OA\Property(property="nombre", type="string", example="Fundación"),
 *  @OA\Property(property="landingPage", type="string", example="www.fundacion.com")
 *  )
 */
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
