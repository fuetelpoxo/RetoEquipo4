<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImagenRequests\StoreImagenRequest;
use App\Http\Requests\ImagenRequests\UpdateImagenRequest;
use App\Http\Resources\ImagenResource;
use App\Models\Imagen;
use Illuminate\Http\Request;

class ImagenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     * path="/api/imagenes",
     * summary="Obtener todas las imagenes",
     * description="Obtener todas las imagenes",
     * operationId="getImagenes",
     * tags={"imagenes"},
     * @OA\Response(
     * response=200,
     * description="Lista de imagenes",
     * @OA\JsonContent(ref="#/components/schemas/imagenes")
     * )
     * )
     */
    public function index()
    {
        $imagen = Imagen::all();
        return ImagenResource::collection($imagen);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     * path="/api/imagenes",
     * summary="Crear una imagen",
     * description="Crear una nueva imagen",
     * operationId="postImagen",
     * tags={"imagenes"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la imagen",
     * @OA\JsonContent(
     * required={"url","nombre","equipo_id","jugador_id","partido_id","patrocinador_id","reto_id","ong_id","publicacion_id","pabellon_id"},
     * @OA\Property(property="url", type="string", example="https://www.ejemplo.com/imagen.jpg"),
     * @OA\Property(property="nombre", type="string", example="Imagen 1"),
     * @OA\Property(property="equipo_id", type="integer", example="1"),
     * @OA\Property(property="jugador_id", type="integer", example="1"),
     * @OA\Property(property="partido_id", type="integer", example="1"),
     * @OA\Property(property="patrocinador_id", type="integer", example="1"),
     * @OA\Property(property="reto_id", type="integer", example="1"),
     * @OA\Property(property="ong_id", type="integer", example="1"),
     * @OA\Property(property="publicacion_id", type="integer", example="1"),
     * @OA\Property(property="pabellon_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Imagen creada",
     * @OA\JsonContent(ref="#/components/schemas/imagenes")
     * ),
     * @OA\Response(
     * response=422,
     * description="Datos no válidos"
     * )
     * )
     */
    public function store(StoreImagenRequest $request)
    {
        $imagenes = Imagen::create($request->validated());
        $imagenes->load('equipo', 'jugador', 'partido', 'patrocinador', 'reto','ong','publicacion','pabellon');
        return response()->json([
            'message' => 'Imagen creada con éxito',
            'data' => new ImagenResource($imagenes)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     * path="/api/imagenes/{id}",
     * summary="Obtener una imagen",
     * description="Obtener una imagen por su id",
     * operationId="getImagen",
     * tags={"imagenes"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID de la imagen",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\Response(
     * response=200,
     * description="Imagen encontrada",
     * @OA\JsonContent(ref="#/components/schemas/imagenes")
     * ),
     * @OA\Response(
     * response=404,
     * description="Imagen no encontrada"
     * )
     * )
     */
    public function show($id)
    {
        $imagenes = Imagen::with(['equipo', 'jugador', 'partido', 'patrocinador', 'reto','ong','publicacion','pabellon'])->find($id);
        if(!$imagenes){
            return response()->json(['error'=>'Imagen no encontrada'],404);
        }
        return new ImagenResource($imagenes);
    }

    /**
     * Update the specified resource in storage.
     */

     /**
      * @OA\Put(
      * path="/api/imagenes/{id}",
      * summary="Actualizar una imagen",
      * description="Actualizar una imagen por su id",
      * operationId="updateImagen",
      * tags={"imagenes"},
      * @OA\Parameter(
      *    name="id",
      *    in="path",
      *    description="ID de la imagen",
      *    required=true,
      *    @OA\Schema(
      *       type="integer"
      *    )
      * ),
      * @OA\RequestBody(
      * required=true,
      * description="Datos de la imagen",
      * @OA\JsonContent(
      * required={"url","nombre","equipo_id","jugador_id","partido_id","patrocinador_id","reto_id","ong_id","publicacion_id","pabellon_id"},
      * @OA\Property(property="url", type="string", example="https://www.ejemplo.com/imagen.jpg"),
      * @OA\Property(property="nombre", type="string", example="Imagen 1"),
      * @OA\Property(property="equipo_id", type="integer", example="1"),
      * @OA\Property(property="jugador_id", type="integer", example="1"),
      * @OA\Property(property="partido_id", type="integer", example="1"),
      * @OA\Property(property="patrocinador_id", type="integer", example="1"),
      * @OA\Property(property="reto_id", type="integer", example="1"),
      * @OA\Property(property="ong_id", type="integer", example="1"),
      * @OA\Property(property="publicacion_id", type="integer", example="1"),
      * @OA\Property(property="pabellon_id", type="integer", example="1")
      * )
      * ),
      * @OA\Response(
      * response=200,
      * description="Imagen actualizada",
      * @OA\JsonContent(ref="#/components/schemas/imagenes")
      * ),
      * @OA\Response(
      * response=404,
      * description="Imagen no encontrada"
      * )
      * )
      */
    public function update(UpdateImagenRequest $request, $id)
    {
        $imagenes = Imagen::find($id);

        if(!$imagenes){
            return response()->json(['error'=>'Imagen no encontrada'],404);
        }
        $datos = $request->validated();
        $imagenes->update($datos);
        return response()->json(['message'=>'Imagen actualizada correctamente','data'=>$imagenes]);
    }

    /**
     * Remove the specified resource from storage.
     */

     /**
      * @OA\Delete(
      * path="/api/imagenes/{id}",
      * summary="Eliminar una imagen",
      * description="Eliminar una imagen por su id",
      * operationId="deleteImagen",
      * tags={"imagenes"},
      * @OA\Parameter(
      *    name="id",
      *    in="path",
      *    description="ID de la imagen",
      *    required=true,
      *    @OA\Schema(
      *       type="integer"
      *    )
      * ),
      * @OA\Response(
      * response=200,
      * description="Imagen eliminada"
      * ),
      * @OA\Response(
      * response=404,
      * description="Imagen no encontrada"
      * )
      * )
      */
    public function destroy($id)
    {
        $imagenes = Imagen::find($id);
        if (!$imagenes) {
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }
        $imagenes->delete();
        return response()->json([
            'message' => 'Imagen eliminada con éxito'
        ]);
    }
}