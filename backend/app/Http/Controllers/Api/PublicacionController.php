<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PublicacionRequests\StorePublicacionRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\PublicacionResource;
use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publicaciones = Publicacion::with('imagenes,equipo,partido,patrocinador,jugador,reto,ong,pabellon')->get();
        return PublicacionResource::collection($publicaciones);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request);
        $publicacion= new Publicacion();
        $publicacion->titulo=$request->titulo;
        $publicacion->texto=$request->texto;
        $publicacion->portada=1;
        dd($publicacion);
        $publicacion=Publicacion::create($publicacion);

       // return new PublicacionResource($publicacion);
    }

    /**
     * Obtiene la publicacion especificada en su id
     */
    public function show(Publicacion $publicacion)
    {
        return new PublicacionResource($publicacion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePublicacionRequest $request, Publicacion $publicacion)
    {
        $datos = $request()->validated();
        $publicacion->update($datos);
        return new PublicacionResource($publicacion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publicacion $publicacion)
    {
        $publicacion->delete();
        return response()->noContent();
    }
}
