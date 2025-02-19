<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActaRequests\StoreActaRequest;
use App\Http\Requests\ActaRequests\UpdateActaRequest;
use App\Http\Resources\ActaResource;
use App\Models\Acta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $actas = Acta::all();
        return ActaResource::collection($actas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActaRequest $request)
    {

        $acta = Acta::create($request->validated());
        $acta->load('partido', 'jugador');
        return response()->json([
            'message' => 'Acta creada con éxito',
            'acta' => new ActaResource($acta)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       $acta = Acta::with(['partido', 'jugador', 'incidencia', 'hora', 'comentario'])->find($id);
        if(!$acta){
            return response()->json(['error'=>'Acta no encontrada'],404);
        }
       return new ActaResource($acta);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActaRequest $request, $id)
    {
        $actas = Acta::find($id);
        if(!$actas){
            return response()->json(['error'=>'Acta no encontrada'],404);
        }
        $datos = $request->validated();
        $actas->update($datos);
        return response()->json(['message'=>'Acta actualizada correctamente','data'=>$actas]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $acta = Acta::find($id);
        if(!$acta){
            return response()->json(['error'=>'Acta no encontrada'],404);
        }
        $acta->delete();
        return response()->noContent();
    }
}