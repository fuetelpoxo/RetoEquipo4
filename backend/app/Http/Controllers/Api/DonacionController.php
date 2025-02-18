<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donacion;
use App\Http\Requests\DonacionRequests\StoreDonacionRequest;
use App\Http\Requests\DonacionRequests\UpdateDonacionRequest;
use App\Http\Resources\DonacionResource;


/**
 * @OA\Info(
 *      title="API de Donaciones",
 *      version="1.0",
 *      description="API para la gestión de donaciones con Laravel",
 *      @OA\Contact(
 *          email="tuemail@example.com"
 *      ),
 *      @OA\License(
 *          name="MIT",
 *          url="https://opensource.org/licenses/MIT"
 *      )
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="Servidor API"
 * )
 */
class DonacionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/donaciones",
     *     summary="Obtener todas las donaciones",
     *     tags={"Donaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de donaciones",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Donacion"))
     *     )
     * )
     */
    public function index()
    {
        $donaciones = Donacion::all();
        return DonacionResource::collection($donaciones);
    }

    /**
     * @OA\Post(
     *     path="/api/donaciones",
     *     summary="Crear una nueva donación",
     *     tags={"Donaciones"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"ong_id","kilos","importe"},
     *             @OA\Property(property="ong_id", type="integer", example=2, description="ID de la ONG"),
     *             @OA\Property(property="kilos", type="integer", example=100, description="Cantidad de kilos donados"),
     *             @OA\Property(property="importe", type="number", format="float", example=150.50, description="Importe de la donación"),
     *         )
     *     ),
     *     @OA\Response(response=201, description="Donación creada")
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
     *     path="/api/donaciones/{id}",
     *     summary="Obtener una donación por ID",
     *     tags={"Donaciones"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la donación", @OA\Schema(type="integer")),
     *     @OA\Response(
     *         response=200,
     *         description="Detalles de la donación",
     *         @OA\JsonContent(ref="#/components/schemas/Donacion")
     *     )
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
     *     path="/api/donaciones/{id}",
     *     summary="Actualizar una donación",
     *     tags={"Donaciones"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la donación", @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="kilos", type="integer", example=120),
     *             @OA\Property(property="importe", type="number", format="float", example=180.75)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Donación actualizada")
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
            'message' => 'Donación actualizada correctamente','data' => $donacion]);
    }

    /**
     * @OA\Delete(
     *     path="/api/donaciones/{id}",
     *     summary="Eliminar una donación",
     *     tags={"Donaciones"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la donación", @OA\Schema(type="integer")),
     *     @OA\Response(response=204, description="Donación eliminada")
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
