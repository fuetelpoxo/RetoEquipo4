<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatrocinadorRequests\StorePatrocinadorRequest;
use App\Http\Resources\PatrocinadorResource;
use App\Http\Requests\PatrocinadorRequests\UpdatePatrocinadorRequest;
use App\Models\Patrocinador;

class PatrocinadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     /**
     * @OA\Get(
     *  path="/api/patrocinadores",
     * summary="Mostrar patrocinador",
     * description="Mostrar patrocinadores",
     * operationId="getPatrocinadores",
     * tags={"patrocinadores"},
     * @OA\Response(
     *  response=200,
     *  description="Lista de patrocinadores",
     * @OA\JsonContent(ref="#/components/schemas/patrocinadores")
     * )
     * ) 
     */
    public function index()
    {
        $patrocinadores = Patrocinador::all();
        return PatrocinadorResource::collection($patrocinadores);
    }
    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *  path="/api/patrocinadores",
     *  summary="Crear un patrocinador",
     *  description="Crear un nuevo patrocinador",
     *  operationId="postPatrocinador",
     *  tags={"patrocinadores"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del patrocinador",
     * @OA\JsonContent(
     * required={"nombre"},
     * @OA\Property(property="nombre", type="string", example="Patrocinador 1")
     * )
     * ),
     * @OA\Response(
     *  response=201,
     *  description="Patrocinador creado",
     *  @OA\JsonContent(ref="#/components/schemas/patrocinadores")
     * ),
     * @OA\Response(
     *  response=422,
     *  description="Datos no válidos"
     * )
     * )
     */
    public function store(StorePatrocinadorRequest $request)
    {
        $patrocinador = Patrocinador::create($request->validated());
        return response()->json([
            'message' => 'Patrocinador creado con éxito',
            'data' => new PatrocinadorResource($patrocinador)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
   /**
    * @OA\Get(
    *  path="/api/patrocinadores/{id}",
    *  summary="Mostrar patrocinador",
    *  description="Mostrar un patrocinador por su id",
    *  operationId="getPatrocinador",
    *  tags={"patrocinadores"},
    * @OA\Parameter(
    *  name="id",
    *  in="path",
    *  description="Id del patrocinador",
    *  required=true,
    *  @OA\Schema(type="integer",example="1")
    * ),
    * @OA\Response(
    *  response=200,
    *  description="Patrocinador mostrado",
    *  @OA\JsonContent(ref="#/components/schemas/patrocinadores")
    * ),
    * @OA\Response(
    *  response=404,
    *  description="Patrocinador no encontrado"
    * )
    * )
    */
    public function show($id)
    {
        if(!$patrocinador = Patrocinador::find($id)){
            return response()->json(['error'=>'Patrocinador no encontrado'],404);
        }
        return new PatrocinadorResource($patrocinador);
    }
    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *  path="/api/patrocinadores/{id}",
     *  summary="Actualizar patrocinador",
     *  description="Actualizar un patrocinador",
     *  operationId="updatePatrocinador",
     *  tags={"patrocinadores"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del patrocinador",
     * @OA\JsonContent(
     * required={"nombre"},
     * @OA\Property(property="nombre", type="string", example="Patrocinador 1")
     * )
     * ),
     * @OA\Parameter(
     *  name="id",
     *  in="path",
     *  description="Id del patrocinador",
     *  required=true,
     *  @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Patrocinador actualizado",
     *  @OA\JsonContent(ref="#/components/schemas/patrocinadores")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Patrocinador no encontrado"
     * )
     * )
     */
    public function update(UpdatePatrocinadorRequest $request, $id)
    {
        $patrocinador = Patrocinador::find($id);
        if(!$patrocinador){
            return response()->json(['error'=>'Patrocinador no encontrado'],404);
        }
        $datos = $request->validated();
        $patrocinador->update($datos);
        return response()->json([
        'message'=>'Patrocinador actualizado correctamente',
        'data'=> new PatrocinadorResource($patrocinador)
    ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *  path="/api/patrocinadores/{id}",
     *  summary="Eliminar patrocinador",
     *  description="Eliminar un patrocinador por su id",
     *  operationId="deletePatrocinador",
     *  tags={"patrocinadores"},
     * @OA\Parameter(
     *  name="id",
     *  in="path",
     *  description="Id del patrocinador",
     *  required=true,
     *  @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Patrocinador eliminado",
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Patrocinador no encontrado"
     * )
     * )
     */
    public function destroy($id)
    {
        $patrocinador = Patrocinador::find($id);
        if(!$patrocinador){
            return response()->json(['error'=>'Patrocinador no encontrado'],404);
        }
        $patrocinador->delete();
        return response()->json([
            'message' => 'Patrocinador eliminado con éxito'
        ]);
    }
}
