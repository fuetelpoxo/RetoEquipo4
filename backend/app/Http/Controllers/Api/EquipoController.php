<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipoResource;
use App\Http\Requests\EquipoRequests\StoreEquipoRequest;
use App\Http\Requests\EquipoRequests\UpdateEquipoRequest;
use App\Models\Equipo;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class EquipoController extends Controller
{
    /**
     * @OA\Get(
     *  path="/api/equipos",
     * summary="Obtener equipos",
     * description="Obtener todos los equipos",
     * operationId="getEquipos",
     * tags={"equipos"},
     * @OA\Response(
     *  response=200,
     *  description="Equipos obtenidos",
     *  @OA\JsonContent(ref="#/components/schemas/equipos")
     * )
     * )
     * )
     */

    public static function middleware(){

    }

    public function index()
    {
        $equipo = Equipo::with('centro')->get();
        return EquipoResource::collection($equipo);

    }

    /**
     * @OA\Post(
     *  path="/api/equipos",
     *  summary="Crear un equipo",
     *  description="Crear un nuevo equipo",
     *  operationId="postEquipo",
     *  tags={"equipos"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del equipo",
     * @OA\JsonContent(
     * required={"nombre","centro_id","grupo"},
     * @OA\Property(property="nombre", type="string", example="Equipo 1"),
     * @OA\Property(property="centro_id", type="integer", example="1"),
     * @OA\Property(property="grupo", type="string", example="A")
     * )
     * ),
     * @OA\Response(
     *  response=201,
     *  description="Equipo creado",
     *  @OA\JsonContent(ref="#/components/schemas/equipos")
     * ),
     * @OA\Response(
     *  response=422,
     *  description="Datos no válidos"
     * )
     * )
     */
    public function store(StoreEquipoRequest $request)
    {
        $equipo= Equipo::create($request->validated());
        $equipo->load('centro');
        return response()->json([
            'message' => 'Equipo creado con éxito',
            'data' => new EquipoResource($equipo)
        ], 201);
    }

    /**
     * @OA\Get(
     *  path="/api/equipos/{id}",
     *  summary="Obtener un equipo",
     *  description="Obtener un equipo por su id",
     *  operationId="getEquipo",
     * tags={"equipos"},
     * @OA\Parameter(
     *    name="id",
     *   in="path",
     *    description="ID del equipo",
     *    required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Equipo encontrado",
     *  @OA\JsonContent(ref="#/components/schemas/equipos")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Equipo no encontrado"
     * )
     * )
     */
    public function show($id)
    {
        $equipo = Equipo::with('centro')->find($id);
        if (!$equipo) {
            return response()->json(['error' => 'Equipo no encontrado'], 404);
        }
        return new EquipoResource($equipo);
    }

    /**
     * @OA\Put(
     *  path="/api/equipos/{id}",
     *  summary="Actualizar un equipo",
     *  description="Actualizar un equipo por su id",
     *  operationId="updateEquipo",
     * tags={"equipos"},
     * @OA\Parameter(
     *    name="id",
     *   in="path",
     *    description="ID del equipo",
     *    required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Datos del equipo",
     * @OA\JsonContent(
     * required={"nombre","centro_id","grupo"},
     * @OA\Property(property="nombre", type="string", example="Equipo 1"),
     * @OA\Property(property="centro_id", type="integer", example="1"),
     * @OA\Property(property="grupo", type="string", example="A")
     * )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Equipo actualizado",
     *  @OA\JsonContent(ref="#/components/schemas/equipos")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Equipo no encontrado"
     * )
     * )
     */
    public function update(UpdateEquipoRequest $request, $id)
{
    $equipo = Equipo::with('centro')->find($id);
    if (!$equipo) {
        return response()->json(['error' => 'Equipo no encontrado'], 404);
    }

    $datos = $request->validated();
    $equipo->update($datos);

    // Usar EquipoResource para formatear la respuesta
    return response()->json([
        'message' => 'Equipo actualizado correctamente',
        'data' => new EquipoResource($equipo),
    ]);
}


   /**
    * @OA\Delete(
    *  path="/api/equipos/{id}",
    *  summary="Eliminar un equipo",
    *  description="Eliminar un equipo por su id",
    *  operationId="deleteEquipo",
    * tags={"equipos"},
    * @OA\Parameter(
    *    name="id",
    *    in="path",
    *    description="ID del equipo",
    *    required=true,
    *    @OA\Schema(
    *       type="integer"
    *    )
    * ),
    * @OA\Response(
    *  response=200,
    *  description="Equipo eliminado"
    * ),
    * @OA\Response(
    *  response=404,
    *  description="Equipo no encontrado"
    * )
    * )
    */
    public function destroy($id)
    {
        $equipo = Equipo::find($id);
        if (!$equipo) {
            return response()->json(['error' => 'Equipo no encontrado'], 404);
        }
        $equipo->delete();
        return response()->json([
            'message' => 'Equipo eliminado con éxito'
        ]);
    }
}
