<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipo;
use App\Http\Resources\EquipoResource;
use App\Http\Requests\EquipoRequests\StoreEquipoRequest;
use App\Http\Requests\EquipoRequests\UpdateEquipoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EquipoController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EquipoResource::collection(Equipo::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(StoreEquipoRequest $request)
    {
        $equipo = Equipo::create([
            'nombre'=> $request->nombre,
            'centro_id'=> $request->centro_id,
            'grupo'=> $request->grupo,
            'usuarioIdCreacion'=> Auth::id() ??1,
            'usuarioIdActualizacion'=> Auth::id() ??1,
            'fechaCreacion'=> now(),
            'fechaActualizacion'=> now()
        ]);
        return response()->json([
            'message' => 'Equipo creado con éxito',
            'equipo' => $equipo
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        return new EquipoResource($equipo);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipoRequest $request, Equipo $equipo)
    {
        $equipo->update($request->validated());
        return new EquipoResource($equipo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipo $equipo)
    {
        $equipo->delete();
        return response()->json(null, 204);
    }
}
