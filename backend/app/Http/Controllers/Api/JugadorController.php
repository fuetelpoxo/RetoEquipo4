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
        return JugadorResource::collection(Jugador::all());
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
    public function show(Jugador $jugador)
    {
        return new JugadorResource($jugador);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJugadorRequest $request, Jugador $jugador)
    {
        $datos = $request->validated();
        Log::info('Datos validados:', $datos);

        $jugador->update($datos);

        return response()->json(['message' => 'Jugador actualizado correctamente', 'data' => $jugador]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugador $jugador)
    {
        $jugador->delete();
        return response()->noContent();
    }
}
