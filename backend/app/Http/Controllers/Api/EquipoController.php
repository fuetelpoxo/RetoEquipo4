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
        return EquipoResource::collection(Equipo::all());
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
        $equipo = Equipo::create([
            'nombre'=> $request->nombre,
            'centro_id'=> $request->centro_id,
            'grupo'=> $request->grupo,
            'usuarioIdCreacion'=> Auth::id() ?? 1,
            'usuarioIdActualizacion'=> Auth::id() ?? 1,
            'fechaCreacion'=> now(),
            'fechaActualizacion'=> now()
        ]);
        return response()->json([
            'message' => 'Equipo creado con éxito',
            'equipo' => $equipo
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
    public function show(Equipo $equipo)
    {
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
    public function update(UpdateEquipoRequest $request, Equipo $equipo)
    {
        $equipo->update($request->validated());
        return new EquipoResource($equipo);
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
    public function destroy(Equipo $equipo)
    {
        $equipo->delete();
        return response()->json("Se ha eliminado el equipo", 204);
    }
}
