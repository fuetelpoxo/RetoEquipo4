<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PartidoResource;
use App\Models\Partido;
use Illuminate\Http\Request;
use App\Http\Requests\PartidoRequests\StorePartidoRequest;
use App\Http\Requests\PartidoRequests\UpdatePartidoRequest;
use Illuminate\Support\Facades\Auth;

class PartidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     /**
     * @OA\Get(
     *  path="/api/partidos",
     * summary="Obtener todos los partidos",
     * description="Obtener todos los partidos",
     * operationId="getPartidos",
     * tags={"partidos"},
     * @OA\Response(
     * response=200,
     * description="Lista de partidos",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(ref="#/components/schemas/partidos")
     * )
     * )
     * )
     */
    public function index()
    {
        $partido =Partido::all();
        return PartidoResource::collection($partido);
    }
    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *  path="/api/partidos",
     *  summary="Crear un partido",
     *  description="Crear un nuevo partido",
     *  operationId="postPartido",
     *  tags={"partidos"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del partido",
     * @OA\JsonContent(
     * required={"equipoL_id","equipoV_id","fecha","hora","golesL","golesV","pabellon_id"},
     * @OA\Property(property="equipoL_id", type="integer", example="1"),
     * @OA\Property(property="equipoV_id", type="integer", example="2"),
     * @OA\Property(property="fecha", type="string", example="2021-10-10"),
     * @OA\Property(property="hora", type="string", example="10:00"),
     * @OA\Property(property="golesL", type="integer", example="2"),
     * @OA\Property(property="golesV", type="integer", example="1"),
     * @OA\Property(property="pabellon_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     *  response=201,
     *  description="Partido creado",
     *  @OA\JsonContent(ref="#/components/schemas/partidos")
     * ),
     * @OA\Response(
     *  response=422,
     *  description="Datos no válidos"
     * )
     * )
     */
    public function store(StorePartidoRequest $request)
{
    $partido = Partido::create($request->validated());
    $partido->load('equipoLocal', 'equipoVisitante', 'pabellon');
    return response()->json([
        'message' => 'Partido creado con éxito',
        'data' => new PartidoResource($partido)
    ], 201);
}



    /**
     * Display the specified resource.
     */
   /**
    * @OA\Get(
    *  path="/api/partidos/{id}",
    *  summary="Obtener un partido",
    *  description="Obtener un partido por su id",
    *  operationId="getPartido",
    * tags={"partidos"},
    * @OA\Parameter(
    *    name="id",
    *    in="path",
    *    description="ID del partido",
    *    required=true,
    *    @OA\Schema(
    *       type="integer"
    *    )
    * ),
    * @OA\Response(
    *  response=200,
    *  description="Partido encontrado",
    *  @OA\JsonContent(ref="#/components/schemas/partidos")
    * ),
    * @OA\Response(
    *  response=404,
    *  description="Partido no encontrado"
    * )
    * )
    */
    public function show($id)
    {
        $partido = Partido::with('equipoLocal','equipoVisitante', 'pabellon')->find($id);
        if(!$partido){
            return response()->json(['error'=>'Partido no encontrado'],404);
        }
        return new PartidoResource($partido);
    }


    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *  path="/api/partidos/{id}",
     *  summary="Actualizar un partido",
     *  description="Actualizar un partido por su id",
     *  operationId="updatePartido",
     * tags={"partidos"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID del partido",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Datos del partido",
     * @OA\JsonContent(
     * required={"equipoL_id","equipoV_id","fecha","hora","golesL","golesV","pabellon_id"},
     * @OA\Property(property="equipoL_id", type="integer", example="1"),
     * @OA\Property(property="equipoV_id", type="integer", example="2"),
     * @OA\Property(property="fecha", type="string", example="2021-10-10"),
     * @OA\Property(property="hora", type="string", example="10:00"),
     * @OA\Property(property="golesL", type="integer", example="2"),
     * @OA\Property(property="golesV", type="integer", example="1"),
     * @OA\Property(property="pabellon_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Partido actualizado",
     *  @OA\JsonContent(ref="#/components/schemas/partidos")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Partido no encontrado"
     * )
     * )
     */
    public function update(UpdatePartidoRequest $request, $id)
    {
        $partido = Partido::find($id);
        if(!$partido){
            return response()->json(['error'=>'Partido no encontrado'],404);
        }
        $datos = $request->validated();
        $partido->update($datos);
        return response()->json([
            'message' => 'Partido actualizado con éxito',
            'data' => new PartidoResource($partido)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */

     /**
      * @OA\Delete(
      *  path="/api/partidos/{id}",
      *  summary="Eliminar un partido",
      *  description="Eliminar un partido por su id",
      *  operationId="deletePartido",
      * tags={"partidos"},
      * @OA\Parameter(
      *    name="id",
      *    in="path",
      *    description="ID del partido",
      *    required=true,
      *    @OA\Schema(
      *       type="integer"
      *    )
      * ),
      * @OA\Response(
      *  response=200,
      *  description="Partido eliminado"
      * ),
      * @OA\Response(
      *  response=404,
      *  description="Partido no encontrado"
      * )
      * )
      */
    public function destroy($id)
    {
        $partido = Partido::find($id);
        if(!$partido){
            return response()->json(['error'=>'Partido no encontrado'],404);
        }
        $partido->delete();
        return response()->json([
            'message' => 'Partido eliminado con éxito'
        ], 200);
    }
}
