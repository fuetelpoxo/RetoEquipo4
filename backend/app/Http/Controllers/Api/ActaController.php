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
    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *  path="/api/actas",
     * summary="Obtener todas las actas",
     * description="Obtener todas las actas",
     * operationId="getActas",
     * tags={"actas"},
     * @OA\Response(
     * response=200,
     * description="Lista de actas",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(ref="#/components/schemas/actas")
     * )
     * )
     * )
     */
    
    public function index()
    {
        $actas = Acta::all();
        return ActaResource::collection($actas);
    }


    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     * path="/api/actas",
     * summary="Crear un acta",
     * description="Crear un nuevo acta",
     * operationId="postActa",
     * tags={"actas"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del acta",
     * @OA\JsonContent(
     * required={"partido_id","jugador_id","incidencia","hora","comentario"},
     * @OA\Property(property="partido_id", type="integer", example="1"),
     * @OA\Property(property="jugador_id", type="integer", example="1"),
     * @OA\Property(property="incidencia", type="string", example="gol"),
     * @OA\Property(property="hora", type="string", example="12:00:00"),
     * @OA\Property(property="comentario", type="string", example="comentario")
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Acta creada",
     * @OA\JsonContent(ref="#/components/schemas/actas")
     * ),
     * @OA\Response(
     * response=422,
     * description="Datos no válidos"
     * )
     * )
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
     * @OA\Get(
     *  path="/api/actas/{id}",
     *  summary="Obtener un acta",
     *  description="Obtener un acta por su id",
     *  operationId="getActa",
     *  tags={"actas"},
     *  @OA\Parameter(
     *     name="id",
     *      in="path",
     *      description="Id del producto",
     *   required=true,
     *   @OA\Schema(type="integer",example="1")
     *  ),
     *  @OA\Response(
     *  response=200,
     *  description="Acta encontrada",
     *  @OA\JsonContent(ref="#/components/schemas/actas")
     * ),
     *  @OA\Response(
     *  response=404,
     *  description="Acta no encontrada"
     *  )
     * )
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
    /**
     * @OA\Put(
     *  path="/api/actas/{id}",
     *  summary="Actualizar un acta",
     *  description="Actualizar un acta por su id",
     *  operationId="updateActa",
     * tags={"actas"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="Id del acta",
     *   required=true,
     *   @OA\Schema(type="integer",example="1")
     *  ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Datos a actualizar",
     *   @OA\JsonContent(required={"partido_id","jugador_id","incidencia","hora","comentario"},
     *  @OA\Property(property="partido_id", type="integer", example="1"),
     * @OA\Property(property="jugador_id", type="integer", example="1"),
     * @OA\Property(property="incidencia", type="string", example="gol"),
     * @OA\Property(property="hora", type="string", example="12:00:00"),
     * @OA\Property(property="comentario", type="string", example="comentario")
     * )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Acta actualizada",
     *  @OA\JsonContent(ref="#/components/schemas/actas")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Acta no encontrada"
     * )
     * )
     */
    public function update(UpdateActaRequest $request, $id)
    {
        $actas = Acta::find($id);
        if(!$actas){
            return response()->json(['error'=>'Acta no encontrada'],404);
        }
        $datos = $request->validated();
        $actas->update($datos);
        return response()->json(['message'=>'Acta actualizada correctamente','data'=> new ActaResource($actas)],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *  path="/api/actas/{id}",
     *  summary="Eliminar un acta",
     *  description="Eliminar un acta por su id",
     *  operationId="deleteActa",
     * tags={"actas"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="Id del acta",
     *   required=true,
     *   @OA\Schema(type="integer",example="1")
     *  ),
     * @OA\Response(
     *  response=200,
     *  description="Acta eliminada"
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Acta no encontrada"
     * )
     * )
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