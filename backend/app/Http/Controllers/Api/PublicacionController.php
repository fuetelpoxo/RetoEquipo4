<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PublicacionRequests\StorePublicacionRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\PublicacionRequests\UpdatePublicacionRequest;
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
            $publicaciones = Publicacion::with([
                'imagenes',
                'equipo',
                'partido',
                'patrocinador',
                'jugador',
                'reto',
                'ong',
                'pabellon'
            ])->get();
            return PublicacionResource::collection($publicaciones);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePublicacionRequest $request)
    {
        $publicacion = Publicacion::create($request->validated());
        return new PublicacionResource($publicacion);
    }

    /**
     * Obtiene la publicacion especificada en su id
     */
    public function show($id)
    {
        $publicacion = Publicacion::with([
            'imagenes',
            'equipo',
            'partido',
            'patrocinador',
            'jugador',
            'reto',
            'ong',
            'pabellon'
        ])->find($id);

        if (!$publicacion) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }

        return new PublicacionResource($publicacion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePublicacionRequest $request, $id)
    {
       // Buscar el jugador por el ID
       $publicacion = Publicacion::find($id);
       // Verificar si el jugador existe
       if (!$publicacion) {
           return response()->json(['error' => 'Publicacion no encontrada'], 404);
       }
       // Validar los datos del request
       $datos = $request->validated();
       // Actualizar los datos del jugador
       $publicacion->update($datos);
       // Devolver una respuesta con el jugador actualizado
       return response()->json(['message' => 'Publicacion actualizada correctamente', 'data' => $publicacion]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $publicacion = Publicacion::find($id);
        if (!$publicacion) {
            return response()->json(['error' => 'Publicacion no encontrada'], 404);
        }
        $publicacion->delete();
        return response()->noContent();
    }
}
