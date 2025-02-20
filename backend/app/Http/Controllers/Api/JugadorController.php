<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use Illuminate\Http\Request;
use App\Http\Requests\JugadorRequests\StoreJugadorRequest;
use App\Http\Requests\JugadorRequests\UpdateJugadorRequest;
use App\Http\Resources\JugadorResource;
use Illuminate\Support\Facades\Auth;

class JugadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *  path="/api/jugadores",
     * summary="Obtener todos los jugadores",
     * description="Obtener todos los jugadores",
     * operationId="getJugadores",
     * tags={"jugadores"},
     * @OA\Response(
     *  response=200,
     *  description="Lista de jugadores",
     *  @OA\JsonContent(
     *  @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/jugadores"))
     * )
     * )
     * )
     */
    public function index()
    {
        $jugadores = Jugador::with(['equipo', 'estudio'])->get();
        return JugadorResource::collection($jugadores);
    }
    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *  path="/api/jugadores",
     *  summary="Crear un jugador",
     *  description="Crear un nuevo jugador",
     *  operationId="postJugador",
     *  tags={"jugadores"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del jugador",
     * @OA\JsonContent(
     * required={"equipo_id","nombre","apellido1","apellido2","tipo","estudio_id","dni","email","telefono"},
     * @OA\Property(property="equipo_id", type="integer", example="1"),
     * @OA\Property(property="nombre", type="string", example="Jugador 1"),
     * @OA\Property(property="apellido1", type="string", example="Apellido 1"),
     * @OA\Property(property="apellido2", type="string", example="Apellido 2"),
     * @OA\Property(property="tipo", type="string", example="jugador"),
     * @OA\Property(property="estudio_id", type="integer", example="1"),
     * @OA\Property(property="dni", type="string", example="12345678A"),
     * @OA\Property(property="email", type="string", example="jugador@example.com"),
     * @OA\Property(property="telefono", type="string", example="123456789")
     * )
     * ),
     * @OA\Response(
     *  response=201,
     *  description="Jugador creado",
     *  @OA\JsonContent(ref="#/components/schemas/jugadores")
     * ),
     * @OA\Response(
     *  response=422,
     *  description="Datos no válidos"
     * )
     * )
     */
    public function store(StoreJugadorRequest $request)
    {
        $jugador = Jugador::create($request->validated());
        $jugador->load('equipo', 'estudio');
        return response()->json([
            'message' => 'Jugador creado con éxito',
            'data' => new JugadorResource($jugador)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *  path="/api/jugadores/{id}",
     *  summary="Obtener un jugador",
     *  description="Obtener un jugador por su id",
     *  operationId="getJugador",
     * tags={"jugadores"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID del jugador",
     *    required=true,
     *    @OA\Schema(
     *      type="integer"
     *    )
     *  ),
     * @OA\Response(
     *  response=200,
     *  description="Jugador encontrado",
     *  @OA\JsonContent(ref="#/components/schemas/jugadores")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Jugador no encontrado"
     * )
     * )
     */
    public function show($id)
    {
        $jugador = Jugador::with(['equipo', 'estudio'])->find($id);
        if(!$jugador){
            return response()->json(['error'=>'Jugador no encontrado'],404);
        }
        return new JugadorResource($jugador);
    }

    /**
     * Update the specified resource in storage.
     */

     /**
      * @OA\Put(
      *  path="/api/jugadores/{id}",
      *  summary="Actualizar un jugador",
      *  description="Actualizar un jugador por su id",
      *  operationId="updateJugador",
      * tags={"jugadores"},
      * @OA\Parameter(
      *    name="id",
      *    in="path",
      *    description="ID del jugador",
      *    required=true,
      *    @OA\Schema(
      *      type="integer"
      *    )
      *  ),
      * @OA\RequestBody(
      * required=true,
      * description="Datos del jugador",
      * @OA\JsonContent(
      * required={"equipo_id","nombre","apellido1","apellido2","tipo","estudio_id","dni","email","telefono"},
      * @OA\Property(property="equipo_id", type="integer", example="1"),
      * @OA\Property(property="nombre", type="string", example="Jugador 1"),
      * @OA\Property(property="apellido1", type="string", example="Apellido 1"),
      * @OA\Property(property="apellido2", type="string", example="Apellido 2"),
      * @OA\Property(property="tipo", type="string", example="jugador"),
      * @OA\Property(property="estudio_id", type="integer", example="1"),
      * @OA\Property(property="dni", type="string", example="12345678A"),
      * @OA\Property(property="email", type="string", example="jugador@example.com"),
      * @OA\Property(property="telefono", type="string", example="123456789")
      * )
      * ),
      * @OA\Response(
      *  response=200,
      *  description="Jugador actualizado",
      *  @OA\JsonContent(ref="#/components/schemas/jugadores")
      * ),
      * @OA\Response(
      *  response=404,
      *  description="Jugador no encontrado"
      * )
      * )
      */
     public function update(UpdateJugadorRequest $request, $id)
    {
        $jugador = Jugador::find($id);
        if(!$jugador){
            return response()->json(['error'=>'Jugador no encontrado'],404);
        }
        $datos = $request->validated();
        $jugador->update($datos);
        return response()->json(['message'=>'Jugador actualizado correctamente','data'=>$jugador]);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *  path="/api/jugadores/{id}",
     *  summary="Eliminar un jugador",
     *  description="Eliminar un jugador por su id",
     *  operationId="deleteJugador",
     * tags={"jugadores"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID del jugador",
     *    required=true,
     *    @OA\Schema(
     *      type="integer"
     *    )
     *  ),
     * @OA\Response(
     *  response=200,
     *  description="Jugador eliminado"
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Jugador no encontrado"
     * )
     * )
     */
    public function destroy($id)
    {
        $jugador = Jugador::find($id);
        if(!$jugador){
            return response()->json(['error'=>'Jugador no encontrado'],404);
        }
        $jugador->delete();
        return response()->json(['message'=>'Jugador eliminado correctamente']);
    }
}
