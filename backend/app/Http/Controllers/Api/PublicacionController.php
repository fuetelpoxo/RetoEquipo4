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
    /**
     * @OA\Get(
     *  path="/api/publicaciones",
     *  summary="Obtener publicaciones",
     *  description="Obtener todas las publicaciones",
     *  operationId="getPublicaciones",
     *  tags={"publicaciones"},
     * @OA\Response(
     *  response=200,
     *  description="Lista de publicaciones",
     *  @OA\JsonContent(
     *  type="array",
     *  @OA\Items(ref="#/components/schemas/publicaciones")
     *  )
     * )
     * )
     */
    public function index()
    {
            $publicaciones = Publicacion::all();
            return PublicacionResource::collection($publicaciones);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *  path="/api/publicaciones",
     *  summary="Crear una publicación",
     *  description="Crear una nueva publicación",
     *  operationId="postPublicacion",
     *  tags={"publicaciones"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la publicación",
     * @OA\JsonContent(
     * required={"titulo","texto","portada","rutavideo","rutaaudio","equipo_id","partido_id","patrocinador_id","jugador_id","reto_id","ong_id","pabellon_id"},
     * @OA\Property(property="titulo", type="string", example="Partido de Fútbol 2025"),
     * @OA\Property(property="texto", type="string", example="Este es un partido importante para el campeonato"),
     * @OA\Property(property="portada", type="string", example="1"),
     * @OA\Property(property="rutavideo", type="string", example=""https://www.example.com/video"),
     * @OA\Property(property="rutaaudio", type="string", example="https://www.example.com/audio"),
     * @OA\Property(property="equipo_id", type="integer", example="1"),
     * @OA\Property(property="partido_id", type="integer", example="2"),
     * @OA\Property(property="patrocinador_id", type="integer", example="2"),
     * @OA\Property(property="jugador_id", type="integer", example="2"),
     * @OA\Property(property="reto_id", type="integer", example="5"),
     * @OA\Property(property="ong_id", type="integer", example="1"),
     * @OA\Property(property="pabellon_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     *  response=201,
     *  description="Publicación creada",
     *  @OA\JsonContent(ref="#/components/schemas/publicaciones")
     * ),
     * @OA\Response(
     *  response=422,
     *  description="Datos no válidos"
     * )
     * )
     */
    public function store(StorePublicacionRequest $request)
    {
        $publicacion = Publicacion::create($request->validated());
        $publicacion->load('imagenes','equipo','partido','patrocinador','jugador');
        return response()->json([
            'message' => 'Publicación creada con éxito',
            'data' => new PublicacionResource($publicacion)
        ], 201);
    }

    /**
     * Obtiene la publicacion especificada en su id
     */
    /**
     * @OA\Get(
     *  path="/api/publicaciones/{id}",
     *  summary="Obtener una publicación",
     *  description="Obtener una publicación por su id",
     *  operationId="getPublicacion",
     * tags={"publicaciones"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID de la publicación",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Publicación encontrada",
     *  @OA\JsonContent(ref="#/components/schemas/publicaciones")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Publicación no encontrada"
     * )
     * )
     */
    public function show($id)
    {
        $publicacion = Publicacion::with(['imagenes','equipo','partido','patrocinador','jugador','reto','ong','pabellon'])->find($id);
        if (!$publicacion) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }
        return new PublicacionResource($publicacion);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *  path="/api/publicaciones/{id}",
     *  summary="Actualizar una publicación",
     *  description="Actualizar una publicación por su id",
     *  operationId="updatePublicacion",
     * tags={"publicaciones"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID de la publicación",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la publicación",
     * @OA\JsonContent(
     * required={"titulo","texto","portada","rutavideo","rutaaudio","equipo_id","partido_id","patrocinador_id","jugador_id","reto_id","ong_id","pabellon_id"},
     * @OA\Property(property="titulo", type="string", example="Partido de Fútbol 2025"),
     * @OA\Property(property="texto", type="string", example="Este es un partido importante para el campeonato"),
     * @OA\Property(property="portada", type="boolean", example="1"),
     * @OA\Property(property="rutavideo", type="string", example="https://www.example.com/video"),
     * @OA\Property(property="rutaaudio", type="string", example="https://www.example.com/audio"),
     * @OA\Property(property="equipo_id", type="integer", example="1"),
     * @OA\Property(property="partido_id", type="integer", example="2"),
     * @OA\Property(property="patrocinador_id", type="integer", example="2"),
     * @OA\Property(property="jugador_id", type="integer", example="2"),
     * @OA\Property(property="reto_id", type="integer", example="5"),
     * @OA\Property(property="ong_id", type="integer", example="1"),
     * @OA\Property(property="pabellon_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Publicación actualizada",
     *  @OA\JsonContent(ref="#/components/schemas/publicaciones")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Publicación no encontrada"
     * )
     * )
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
    /**
     * @OA\Delete(
     *  path="/api/publicaciones/{id}",
     *  summary="Eliminar una publicación",
     *  description="Eliminar una publicación por su id",
     *  operationId="deletePublicacion",
     * tags={"publicaciones"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID de la publicación",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Publicación eliminada"
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Publicación no encontrada"
     * )
     * )
     */
    public function destroy($id)
    {
        $publicacion = Publicacion::find($id);
        if (!$publicacion) {
            return response()->json(['error' => 'Publicacion no encontrada'], 404);
        }
        $publicacion->delete();
        return response()->json([
            'message' => 'Publicacion eliminada con éxito'
        ]);
    }
}
