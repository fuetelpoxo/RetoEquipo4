<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *  schema="ciclos",
 *  type="object",
 *  title="Ciclos",
 *  @OA\Property(property="nombre", type="string", example="Desarrollo de aplicaciones multiplataforma"),
 *  @OA\Property(property="familia_id", type="integer", example="1")
 *  )
 */
class Ciclo extends Model
{
    protected $table = 'ciclos';
    protected $fillable = [
        'nombre',
        'familia_id'
    ];

    public function familia()
    {
        return $this->belongsTo(Familia::class, 'familia_id');
    }
}
