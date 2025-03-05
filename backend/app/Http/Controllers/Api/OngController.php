<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\OngRequests\StoreOngRequest;
use App\Http\Requests\OngRequests\UpdateOngRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\OngResource;
use App\Models\Ong;
use Illuminate\Http\Request;

class OngController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *  path="/api/ongs",
     *  summary="Obtener todas las ONGs",
     *  description="Obtener todas las ONGs",
     *  operationId="getOngs",
     *  tags={"ongs"},
     *  @OA\Response(
     *  response=200,
     *  description="Lista de ONGs",
     *  @OA\JsonContent(ref="#/components/schemas/ongs")
     * )
     * )   
     */
    public function index()
    {
        $ongs = Ong::all();
        return OngResource::collection($ongs);
    }
    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     * path="/api/ongs",
     * summary="Crear una ONG",
     * description="Crear una nueva ONG",
     * operationId="postOng",
     * tags={"ongs"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la ONG",
     * @OA\JsonContent(
     * required={"nombre","landingPage"},
     * @OA\Property(property="nombre", type="string", example="Greenpeace"),
     * @OA\Property(property="landingPage", type="string", example="https://www.greenpeace.org/espana/")
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="ONG creada con éxito",
     * @OA\JsonContent(ref="#/components/schemas/ongs")
     * )
     * )
     */
    public function store(StoreOngRequest $request)
    {
        $ong = Ong::create($request->validated());
        return response()->json([
            'message' => 'Ong creada con éxito',
            'ong' => new OngResource($ong)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     * path="/api/ongs/{id}",
     * summary="Mostrar ONG",
     * description="Mostrar ONG",
     * operationId="getOng",
     * tags={"ongs"},
     * @OA\Parameter(
     * name="id",
     * description="ID de la ONG",
     * required=true,
     * in="path",
     * @OA\Schema(
     * type="integer"
     * )
     * ),
     * @OA\Response(
     * response=200,
     * description="ONG encontrada",
     * @OA\JsonContent(ref="#/components/schemas/ongs")
     * ),
     * @OA\Response(
     * response=404,
     * description="ONG no encontrada"
     * )
     * )
     */
    public function show($id)
    {
        if(!$ong=Ong::find($id)){
            return response()->json(['message' => 'Ong no encontrada'], 404);
        }
        return new OngResource($ong);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     * path="/api/ongs/{id}",
     * summary="Actualizar ONG",
     * description="Actualizar una ONG",
     * operationId="updateOng",
     * tags={"ongs"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la ONG",
     * @OA\JsonContent(
     * required={"nombre","landingPage"},
     * @OA\Property(property="nombre", type="string", example="Greenpeace"),
     * @OA\Property(property="landingPage", type="string", example="https://www.greenpeace.org/espana/")
     * )
     * ),
     * @OA\Parameter(
     * name="id",
     * in="path",
     * description="Id de la ONG",
     * required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     * response=200,
     * description="ONG actualizada",
     * @OA\JsonContent(ref="#/components/schemas/ongs")
     * ),
     * @OA\Response(
     * response=404,
     * description="ONG no encontrada"
     * )
     * )
     */
    public function update(UpdateOngRequest $request, $id)
    {
        $ongs = Ong::find($id);
        if(!$ongs){
            return response()->json(['message' => 'Ong no encontrada'], 404);
        }
        $datos=$request->validated();
        $ongs->update($datos);
        return response()->json([
            'message' => 'Ong actualizada con éxito',
            'ong' => new OngResource($ongs)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     * path="/api/ongs/{id}",
     * summary="Eliminar ONG",
     * description="Eliminar una ONG",
     * operationId="deleteOng",
     * tags={"ongs"},
     * @OA\Parameter(
     * name="id",
     * in="path",
     * description="Id de la ONG",
     * required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     * response=200,
     * description="ONG eliminada"
     * ),
     * @OA\Response(
     * response=404,
     * description="ONG no encontrada"
     * )
     * )
     */
    public function destroy($id)
    {
        $ong = Ong::find($id);
        if(!$ong){
            return response()->json(['message' => 'Ong no encontrada'], 404);
        }
        $ong->delete();
        return response()->json(['message' => 'Ong eliminada con éxito'], 200);
    }
}
