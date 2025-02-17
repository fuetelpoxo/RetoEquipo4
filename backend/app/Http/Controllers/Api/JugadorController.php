<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use App\Http\Requests\JugadorRequests\StoreJugadorRequest;
use App\Http\Requests\JugadorRequests\UpdateJugadorRequest;
use App\Http\Resources\JugadorResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JugadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jugadores = Jugador::with([
            'imagenes',
            'equipo',
            'actas',
            'publicaciones',
            'estudio'
        ])->get();
        return JugadorResource::collection($jugadores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJugadorRequest $request)
    {
        $jugador = Jugador::create($request->validated());
        $jugador->load('equipo', 'estudio', 'actas', 'imagenes', 'publicaciones');
        return new JugadorResource($jugador);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jugadores = Jugador::with([
            'imagenes',
            'equipo',
            'actas',
            'estudio',
            'publicaciones',

        ])->find($id);

        if (!$jugadores) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }

        return new JugadorResource($jugadores);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJugadorRequest $request, $id)
    {
        // Buscar el jugador por el ID
        $jugador = Jugador::find($id);
        // Verificar si el jugador existe
        if (!$jugador) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }
        // Validar los datos del request
        $datos = $request->validated();
        // Actualizar los datos del jugador
        $jugador->update($datos);
        // Devolver una respuesta con el jugador actualizado
        return response()->json(['message' => 'Jugador actualizado correctamente', 'data' => $jugador]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $jugador = Jugador::find($id);
        if (!$jugador) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }
        $jugador->delete();
        return response()->noContent();
    }
}
