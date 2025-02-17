<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PartidoResource;
use App\Models\Partido;
use Illuminate\Http\Request;
use App\Http\Requests\PartidoRequests\StorePartidoRequest;
use App\Http\Requests\PartidoRequests\UpdatePartidoRequest;
use Illuminate\Support\Facades\Auth;

class PartidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partido =Partido::all();
        return PartidoResource::collection($partido);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePartidoRequest $request)
    {
        $partido= Partido::create([
            'equipoL_id' => $request->equipoL_id,
            'equipoV_id' => $request->equipoV_id,
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'golesL' => $request->golesL,
            'golesV' => $request->golesV,
            'pabellon' => $request->pabellon,
            'usuarioIdCreacion' => Auth::id() ?? 1,
            'fechaCreacion' => now(),
            'usuarioIdActualizacion' => Auth::id() ?? 1,
            'fechaActualizacion' => now()
        ]);
        return response()->json([
            'message' => 'Partido creado con éxito',
            'partido' => $partido
        ], 201);
        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $partido = Partido::find($id);
        return new PartidoResource($partido);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePartidoRequest $request, $id)
    {
        $partido = Partido::findOrfail($id);
        $partido->update($request->validated());
        return new PartidoResource($partido);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $partido = Partido::findOrFail($id);
        $partido->delete();
        return response()->json([
            'message' => 'Partido eliminado con éxito'
        ], 200);
    }
}
