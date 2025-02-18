<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipoResource;
use App\Http\Requests\EquipoRequests\StoreEquipoRequest;
use App\Http\Requests\EquipoRequests\UpdateEquipoRequest;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Tag(
 *     name="Equipo",
 *     description="Operaciones sobre equipos"
 * )
 */
class EquipoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/equipos",
     *     tags={"Equipo"},
     *     summary="Lista todos los equipos",
     *     description="Obtiene todos los equipos almacenados",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de equipos",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Equipo"))
     *     )
     * )
     */
    public function index()
    {
        $equipo = Equipo::all();
        return EquipoResource::collection($equipo);

    }

    /**
     * @OA\Post(
     *     path="/api/equipos",
     *     tags={"Equipo"},
     *     summary="Crea un nuevo equipo",
     *     description="Recibe los datos para crear un nuevo equipo",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Equipo")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Equipo creado con éxito",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="equipo", ref="#/components/schemas/Equipo")
     *         )
     *     )
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
     *     path="/api/equipos/{id}",
     *     tags={"Equipo"},
     *     summary="Obtiene un equipo específico",
     *     description="Muestra los detalles de un equipo por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalles del equipo",
     *         @OA\JsonContent(ref="#/components/schemas/Equipo")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Equipo no encontrado"
     *     )
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
     *     path="/api/equipos/{id}",
     *     tags={"Equipo"},
     *     summary="Actualiza un equipo",
     *     description="Actualiza los datos de un equipo específico",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Equipo")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Equipo actualizado",
     *         @OA\JsonContent(ref="#/components/schemas/Equipo")
     *     )
     * )
     */
    public function update(UpdateEquipoRequest $request, $id)
    {
        $equipo = Equipo::find($id);
        if (!$equipo) {
            return response()->json(['error' => 'Equipo no encontrado'], 404);
        }
        $datos = $request->validated();
        $equipo->update($datos);
        return response()->json(['message' => 'Equipo actualizado correctamente', 'data' => $equipo]);
    }

    /**
     * @OA\Delete(
     *     path="/api/equipos/{id}",
     *     tags={"Equipo"},
     *     summary="Elimina un equipo",
     *     description="Elimina un equipo por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Equipo eliminado"
     *     )
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
