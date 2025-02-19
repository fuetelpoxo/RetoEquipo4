<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\CicloRequests\StoreCicloRequest;
use App\Http\Requests\CicloRequests\UpdateCicloRequest;
use App\Http\Resources\CicloResource;
use App\Models\Ciclo;

use Illuminate\Http\Request;

class CicloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *  path="/api/ciclos",
     *  summary="Obtener todos los ciclos",
     *  description="Obtener todos los ciclos",
     *  operationId="getCiclos",
     *  tags={"ciclos"},
     *  @OA\Response(
     *  response=200,
     *  description="Ciclos encontrados",
     *  @OA\JsonContent(ref="#/components/schemas/ciclos")
     * )
     * )
     */
    public function index()
    {
        $ciclo = Ciclo::all();
        return CicloResource::collection($ciclo);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     * path="/api/ciclos",
     * summary="Crear un ciclo",
     * description="Crear un nuevo ciclo",
     * operationId="postCiclo",
     * tags={"ciclos"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del ciclo",
     * @OA\JsonContent(
     * required={"nombre","familia_id"},
     * @OA\Property(property="nombre", type="string", example="Desarrollo de aplicaciones multiplataforma"),
     * @OA\Property(property="familia_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Ciclo creado con éxito",
     * @OA\JsonContent(ref="#/components/schemas/ciclos")
     * )
     * )
     */
    public function store(StoreCicloRequest $request)
    {
        $ciclo = Ciclo::create($request->validated());
        return response()->json([
            'message' => 'Ciclo creado con éxito',
            'data' => new CicloResource($ciclo)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *  path="/api/ciclos/{id}",
     *  summary="Obtener un ciclo",
     *  description="Obtener un ciclo por su id",
     *  operationId="getCiclo",
     *  tags={"ciclos"},
     *  @OA\Parameter(
     *  name="id",
     *  description="ID del ciclo",
     *  required=true,
     *  in="path",
     *  @OA\Schema(
     *  type="integer"
     *  )
     *  ),
     *  @OA\Response(
     *  response=200,
     *  description="Ciclo encontrado",
     *  @OA\JsonContent(ref="#/components/schemas/ciclos")
     *  )
     * ) 
     */
    public function show($id)
    {
        if(!$ciclo = Ciclo::find($id)) {
            return response()->json(['message' => 'Ciclo no encontrado'], 404);
        }
        return new CicloResource($ciclo);
    }


    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *  path="/api/ciclos/{id}",
     *  summary="Actualizar un ciclo",
     *  description="Actualizar un ciclo por su id",
     *  operationId="updateCiclo",
     * tags={"ciclos"},
     * @OA\Parameter(
     *  name="id",
     *  description="ID del ciclo",
     *  required=true,
     *  in="path",
     *  @OA\Schema(
     *  type="integer"
     *  )
     *  ),
     * @OA\RequestBody(
     *  required=true,
     *  description="Datos del ciclo",
     *  @OA\JsonContent(
     *  required={"nombre","familia_id"},
     *  @OA\Property(property="nombre", type="string", example="Desarrollo de aplicaciones multiplataforma"),
     *  @OA\Property(property="familia_id", type="integer", example="1")
     *  )
     *  ),
     * @OA\Response(
     *  response=200,
     *  description="Ciclo actualizado con éxito",
     *  @OA\JsonContent(ref="#/components/schemas/ciclos")
     * )
     * )
     */
    public function update(UpdateCicloRequest $request, $id)
    {
        $ciclo = Ciclo::find($id);
        if(!$ciclo) {
            return response()->json(['message' => 'Ciclo no encontrado'], 404);
        }
        $ciclo->update($request->validated());
        return response()->json([
            'message' => 'Ciclo actualizado con éxito',
            'data' => new CicloResource($ciclo)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *  path="/api/ciclos/{id}",
     *  summary="Eliminar un ciclo",
     *  description="Eliminar un ciclo por su id",
     *  operationId="deleteCiclo",
     *  tags={"ciclos"},
     *  @OA\Parameter(
     *  name="id",
     *  description="ID del ciclo",
     *  required=true,
     *  in="path",
     *  @OA\Schema(
     *  type="integer"
     *  )
     *  ),
     *  @OA\Response(
     *  response=200,
     *  description="Ciclo eliminado con éxito"
     * )
     * )    
     */
    public function destroy($id)
    {
        $ciclo = Ciclo::find($id);
        if(!$ciclo) {
            return response()->json(['message' => 'Ciclo no encontrado'], 404);
        }
        $ciclo->delete();
        return response()->json([
            'message' => 'Ciclo eliminado con éxito'
        ], 200);
    }
}
