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
        $patrocinador = Patrocinador::create([
            'nombre' => $request->nombre,
            'usuarioIdCreacion' => Auth::id() ?? 1,
            'fechaCreacion' => now(),
            'usuarioIdActualizacion' => Auth::id() ?? 1,
            'fechaActualizacion' => now()
        ]);
         return response()->json([
            'message' => 'Patrocinador creado con éxito',
            'patrocinador' => $patrocinador
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $patrocinador = Patrocinador::find($id);
        return new PatrocinadorResource($patrocinador);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatrocinadorRequest $request, $id)
    {
        $patrocinador = Patrocinador::findOrfail($id);
        $patrocinador->update($request->validated());
        return new PatrocinadorResource($patrocinador);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $patrocinador = Patrocinador::findOrFail($id);
        $patrocinador->delete();
        return response()->json([
            'message' => 'Patrocinador eliminado con éxito'
        ]);
    }
}
