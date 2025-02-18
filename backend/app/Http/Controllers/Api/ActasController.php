<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActasRequests\StoreActasRequest;
use App\Http\Requests\ActasRequests\UpdateActasRequest;
use App\Http\Resources\ActaResource;
use App\Models\Acta;
use Illuminate\Http\Request;

class ActasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $actas = Acta::with([
            'partido',
            'jugador'
        ])->get();
        return ActaResource::collection($actas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActasRequest $request)
    {
        $acta = Acta::create($request->validated());
        return new ActaResource($acta);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       $actas = Acta::with(['partido','jugador'])->find($id);
       if(!$actas){
        return response()->json(['error'=>'Acta no encontrada']);
       }
       return new ActaResource($actas);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActasRequest $request, $id)
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
