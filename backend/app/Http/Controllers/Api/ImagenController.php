<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImagenesRequests\StoreImagenRequest;
use App\Http\Requests\ImagenesRequests\UpdateImagenRequest;
use App\Http\Resources\ImagenResource;
use App\Models\Imagen;
use Illuminate\Http\Request;

class ImagenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $imagenes = Imagen::with([
            'equipo',
            'jugador',
            'partido',
            'patrocinador',
            'reto',
            'ong',
            'publicacion',
            'pabellon'
        ])->get();
        return ImagenResource::collection($imagenes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImagenRequest $request)
    {
        $imagenes = Imagen::create($request->validated());
        $imagenes->load('equipo', 'jugador', 'partido', 'patrocinador', 'reto','ong','publicacion','pabellon');
        return new ImagenResource($imagenes);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $imagenes = Imagen::with(['equipo', 'jugador', 'partido', 'patrocinador', 'reto','ong','publicacion','pabellon'])->find($id);
        if(!$imagenes){
            return response()->json(['error'=>'Imagen no encontrada']);
        }
        return new ImagenResource($imagenes);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImagenRequest $request, $id)
    {
        $imagenes = Imagen::find($id);

        if(!$imagenes){
            return response()->json(['error'=>'Imagen no encontrada']);
        }
        $datos = $request->validated();
        $imagenes->update($datos);
        return response()->json(['message'=>'Imagen actualizada correctamente','data'=>$imagenes]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $imagenes = Imagen::find($id);
        if (!$imagenes) {
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }
        $imagenes->delete();
        return response()->noContent();
    }
}
