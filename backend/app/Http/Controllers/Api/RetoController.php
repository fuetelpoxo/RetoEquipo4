<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RetoResource;
use App\Models\Reto;
use Illuminate\Http\Request;

class RetoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $retos = Reto::with(['estudio','publicaciones','imagenes'])->get(); // Ahora se cargan los estudios
        return RetoResource::collection($retos);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $reto = Reto::with(['publicaciones', 'imagenes', 'estudio'])->find($id);
        if (!$reto) {
            return response()->json(['error' => 'Reto no encontrado'], 404);
        }
        return new RetoResource($reto);
    }
}
