<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActaResource;
use App\Models\Acta;
use Illuminate\Http\Request;
use App\Http\Requests\ActaRequests\StoreActaRequest;
use App\Http\Requests\ActaRequests\UpdateActaRequest;
use Illuminate\Support\Facades\Auth;

class ActaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $acta=Acta::all();
        return ActaResource::collection($acta);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActaRequest $request)
    {
        $acta= Acta::create([
            'partido_id' => $request->partido_id,
            'jugador_id' => $request->jugador_id,
            'incidencia' => $request->incidencia,
            'hora' => $request->hora,
            'comentario' => $request->comentario,
            'usuarioIdCreacion' => Auth::id() ?? 1,
            'fechaCreacion' => now(),
            'usuarioIdActualizacion' => Auth::id() ?? 1,
            'fechaActualizacion' => now()
        ]);
        return response()->json([
            'message' => 'Acta creada con éxito',
            'acta' => $acta
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $acta = Acta::find($id);
        return new ActaResource($acta);
    }

    
   

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActaRequest $request, $id)
    {
        $acta = Acta::findOrfail($id);
        $acta->update($request->validated());
        return new ActaResource($acta);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $acta = Acta::findOrfail($id);
        $acta->delete();
        return response()->json([
            'message' => 'Acta eliminada con éxito'
        ], 200);
    }
}
