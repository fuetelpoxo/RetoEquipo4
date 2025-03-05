<?php

namespace App\Http\Controllers\Api;

use App\Models\Estudio;
use App\Http\Controllers\Controller;
use App\Http\Resources\EquipoResource;
use App\Http\Resources\EstudioResource;
use Illuminate\Http\Request;

class EstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Cargar las relaciones y devolver los estudios con sus relaciones
        $estudios = Estudio::with(['centro', 'ciclo', 'retos', 'jugadores'])->get();

        // Devolver los estudios con sus relaciones usando el recurso
        return EstudioResource::collection($estudios);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Buscar el estudio por ID o devolver 404 si no existe
        $estudio = Estudio::with(['centro', 'ciclo', 'retos', 'jugadores'])->findOrFail($id);

        // Devolver el estudio con sus relaciones usando el recurso
        return new EstudioResource($estudio);
    }
}
