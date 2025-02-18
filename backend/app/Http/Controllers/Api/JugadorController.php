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
        $jugador = Jugador::create($request->validated());
        $jugador->load('equipo', 'estudio');
        return response()->json([
            'message' => 'Jugador creado con éxito',
            'data' => new JugadorResource($jugador)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jugador = Jugador::with(['equipo', 'estudio'])->find($id);
        if(!$jugador){
            return response()->json(['error'=>'Jugador no encontrado'],404);
        }
        return new JugadorResource($jugador);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJugadorRequest $request, $id)
    {
        $jugador = Jugador::find($id);
        if(!$jugador){
            return response()->json(['error'=>'Jugador no encontrado'],404);
        }
        $datos = $request->validated();
        $jugador->update($datos);
        return response()->json(['message'=>'Jugador actualizado correctamente','data'=>$jugador]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $jugador = Jugador::find($id);
        if(!$jugador){
            return response()->json(['error'=>'Jugador no encontrado'],404);
        }
        $jugador->delete();
        return response()->json(['message'=>'Jugador eliminado correctamente']);
    }
}
