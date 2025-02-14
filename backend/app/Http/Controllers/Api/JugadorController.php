<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use Illuminate\Http\Request;
use App\Http\Requests\JugadorRequests\StoreJugadorRequest;
use App\Http\Requests\JugadorRequests\UpdateJugadorRequest;
use App\Http\Resources\JugadorResource;
use Illuminate\Support\Facades\Auth;

class JugadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jugadores = Jugador::all();
        return JugadorResource::collection($jugadores);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJugadorRequest $request)
    {
        $jugador = Jugador::create([
            'equipo_id' => $request->equipo_id,
            'nombre' => $request->nombre,
            'apellido1' => $request->apellido1,
            'apellido2' => $request->apellido2,
            'tipo' => $request->tipo,
            'estudio_id' => $request->estudio_id,
            'dni' => $request->dni,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'usuarioIdCreacion' => Auth::id() ?? 1,
            'fechaCreacion' => now(),
            'usuarioIdActualizacion' => Auth::id() ?? 1,
            'fechaActualizacion' => now()
        ]);
        return response()->json([
            'message' => 'Jugador creado con éxito',
            'jugador' => $jugador
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jugador = Jugador::findOrFail($id);
        return new JugadorResource($jugador);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJugadorRequest $request, $id)
    {
        $jugador = Jugador::findOrFail($id);
        $jugador->update($request->validated());
        return new JugadorResource($jugador);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $jugador = Jugador::findOrFail($id);
        $jugador->delete();
        return response()->noContent();
    }
}
