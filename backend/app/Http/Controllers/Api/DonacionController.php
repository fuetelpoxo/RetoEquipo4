<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donacion;
use App\Http\Requests\DonacionRequests\StoreDonacionRequest;
use App\Http\Requests\DonacionRequests\UpdateDonacionRequest;
use App\Http\Resources\DonacionResource;



class DonacionController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/donaciones",
     * summary="Listado de donaciones",
     * description="Listado de todas las donaciones",
     * operationId="getDonaciones",
     * tags={"donaciones"},
     * @OA\Response(
     * response=200,
     * description="Listado de donaciones",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(ref="#/components/schemas/donaciones")
     * )
     * )
     * )
     */
  
    public function index()
    {
        $donaciones = Donacion::all();
        return DonacionResource::collection($donaciones);
    }
    /**
     * @OA\Post(
     * path="/api/donaciones",
     * summary="Crear una donación",
     * description="Crear una nueva donación",
     * operationId="postDonacion",
     * tags={"donaciones"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la donación",
     * @OA\JsonContent(
     * required={"ong_id","kilos","importe"},
     * @OA\Property(property="ong_id", type="integer", example="1"),
     * @OA\Property(property="kilos", type="integer", example="10"),
     * @OA\Property(property="importe", type="integer", example="100")
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Donación creada",
     * @OA\JsonContent(ref="#/components/schemas/donaciones")
     * ),
     * @OA\Response(
     * response=422,
     * description="Datos no válidos"
     * )
     * )
     */

    public function store(StoreDonacionRequest $request)
    {
        $donacion = Donacion::create($request->validated());
        $donacion->load('ong');

        return response()->json([
            'message' => 'Donación creada con éxito',
            'donacion' => new DonacionResource($donacion)
        ], 201);
    }
    
/**
     * @OA\Get(
     *  path="/api/donaciones/{id}",
     *  summary="Obtener una donación",
     *  description="Obtener una donación por su id",
     *  operationId="getDonacion",
     *  tags={"donaciones"},
     *  @OA\Parameter(
     *     name="id",
     *      in="path",
     *      description="Id del producto",
     *   required=true,
     *   @OA\Schema(type="integer",example="1")
     *  ),
     *  @OA\Response(
     *  response=200,
     *  description="Donación encontrada",
     *  @OA\JsonContent(ref="#/components/schemas/donaciones")
     * ),
     *  @OA\Response(
     *  response=404,
     *  description="Donación no encontrada"
     *  )
     * )
     */
    public function show($id)
    {
        $donacion = Donacion::with('ong')->find($id);
        if (!$donacion) {
            return response()->json(['error' => 'Donación no encontrada'], 404);
        }
        return new DonacionResource($donacion);
    }
    /**
     * @OA\Put(
     * path="/api/donaciones/{id}",
     * summary="Actualizar una donación",
     * description="Actualizar una donación por su id",
     * operationId="updateDonacion",
     * tags={"donaciones"},
     * @OA\Parameter(
     *   name="id",
     *  in="path",
     * description="Id de la donación",
     * required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la donación",
     * @OA\JsonContent(
     * required={"ong_id","kilos","importe"},
     * @OA\Property(property="ong_id", type="integer", example="1"),
     * @OA\Property(property="kilos", type="integer", example="10"),
     * @OA\Property(property="importe", type="integer", example="100")
     * )
     * ),
     * @OA\Response(
     * response=200,
     * description="Donación actualizada",
     * @OA\JsonContent(ref="#/components/schemas/donaciones")
     * ),
     * @OA\Response(
     * response=404,
     * description="Donación no encontrada"
     * )
     * )
     */

    public function update(UpdateDonacionRequest $request, $id)
    {
        $donacion = Donacion::find($id);
        if (!$donacion) {
            return response()->json(['error' => 'Donación no encontrada'], 404);
        }
        $datos = $request->validated();
        $donacion->update($datos);
        return response()->json([
            'message' => 'Donación actualizada correctamente',
            'data' => $donacion
        ]);
    }

    /**
     * @OA\Delete(
     * path="/api/donaciones/{id}",
     * summary="Eliminar una donación",
     * description="Eliminar una donación por su id",
     * operationId="deleteDonacion",
     * tags={"donaciones"},
     * @OA\Parameter(
     * name="id",
     * in="path",
     * description="Id de la donación",
     * required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     * response=200,
     * description="Donación eliminada"
     * ),
     * @OA\Response(
     * response=404,
     * description="Donación no encontrada"
     * )
     * )
     */
    public function destroy($id)
    {
        $donacion = Donacion::find($id);
        if (!$donacion) {
            return response()->json(['error' => 'Donación no encontrada'], 404);
        }
        $donacion->delete();
        return response()->json([
            'message' => 'Donación eliminada con éxito'
        ]);
    }
}
