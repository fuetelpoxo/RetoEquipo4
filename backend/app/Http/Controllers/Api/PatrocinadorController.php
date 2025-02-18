<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatrocinadorRequests\StorePatrocinadorRequest;
use App\Http\Resources\PatrocinadorResource;
use App\Http\Requests\PatrocinadorRequests\UpdatePatrocinadorRequest;
use App\Models\Patrocinador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatrocinadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patrocinadores = Patrocinador::all();
        return PatrocinadorResource::collection($patrocinadores);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatrocinadorRequest $request)
    {
        $patrocinador = Patrocinador::create($request->validated());
        return response()->json([
            'message' => 'Patrocinador creado con éxito',
            'data' => new PatrocinadorResource($patrocinador)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if(!$patrocinador = Patrocinador::find($id)){
            return response()->json(['error'=>'Patrocinador no encontrado'],404);
        }
        return new PatrocinadorResource($patrocinador);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatrocinadorRequest $request, $id)
    {
        $patrocinador = Patrocinador::find($id);
        if(!$patrocinador){
            return response()->json(['error'=>'Patrocinador no encontrado'],404);
        }
        $datos = $request->validated();
        $patrocinador->update($datos);
        return response()->json(['message'=>'Patrocinador actualizado correctamente','data'=>$patrocinador]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $patrocinador = Patrocinador::find($id);
        if(!$patrocinador){
            return response()->json(['error'=>'Patrocinador no encontrado'],404);
        }
        $patrocinador->delete();
        return response()->json([
            'message' => 'Patrocinador eliminado con éxito'
        ]);
    }
}
