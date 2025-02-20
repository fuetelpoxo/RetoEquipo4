<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscripcion;
use Illuminate\Http\Request;
use App\Http\Resources\InscripcionResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\InscripcionRequests\StoreInscripcionRequest;
use App\Http\Requests\InscripcionRequests\UpdateInscripcionRequest;
class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     /**
     * @OA\Get(
     *  path="/api/inscripciones",
     * summary="Obtener todas las inscripciones",
     * description="Obtener todas las inscripciones",
     * operationId="getInscripciones",
     * tags={"inscripciones"},
     * @OA\Response(
     * response=200,
     * description="Lista de inscripciones",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(ref="#/components/schemas/inscripciones")
     * )
     * )
     * )
     */
    public function index()
    {
      $inscripcion = Inscripcion::all();
      return InscripcionResource::collection($inscripcion);
    }


    /**
     * Store a newly created resource in storage.
     */

     /**
      * @OA\Post(
      *  path="/api/inscripciones",
      *  summary="Crear una inscripción",
      *  description="Crear una nueva inscripción",
      *  operationId="postInscripcion",
      *  tags={"inscripciones"},
      * @OA\RequestBody(
      * required=true,
      * description="Datos de la inscripción",
      * @OA\JsonContent(
      * required={"comentarios","estado","equipo_id"},
      * @OA\Property(property="comentarios", type="string", example="Comentarios de la inscripción"),
      * @OA\Property(property="estado", type="string", example="pendiente"),
      * @OA\Property(property="equipo_id", type="integer", example="1")
      * )
      * ),
      * @OA\Response(
      *  response=201,
      *  description="Inscripción creada",
      *  @OA\JsonContent(ref="#/components/schemas/inscripciones")
      * ),
      * @OA\Response(
      *  response=422,
      *  description="Datos no válidos"
      * )
      * )
      */
    public function store(StoreInscripcionRequest $request)
    {
        $inscripcion = Inscripcion::create($request->validated());
        $inscripcion->load('equipo');

        return response()->json([
            'message' => 'Inscripción creada con éxito',
            'inscripcion' => new InscripcionResource($inscripcion)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
   /**
    * @OA\Get(
    *  path="/api/inscripciones/{id}",
    *  summary="Obtener una inscripción",
    *  description="Obtener una inscripción por su id",
    *  operationId="getInscripcion",
    * tags={"inscripciones"},
    * @OA\Parameter(
    *    name="id",
    *    in="path",
    *    description="ID de la inscripción",
    *    required=true,
    *    @OA\Schema(
    *       type="integer"
    *    )
    * ),
    * @OA\Response(
    *  response=200,
    *  description="Inscripción encontrada",
    *  @OA\JsonContent(ref="#/components/schemas/inscripciones")
    * ),
    * @OA\Response(
    *  response=404,
    *  description="Inscripción no encontrada"
    * )
    * )
    */
    public function show( $id)
    {
        $inscripcion=Inscripcion::with('equipo')->find($id);
        if(!$inscripcion){
            return response()->json(['error'=>'Inscripción no encontrada'],404);
        }
        return new InscripcionResource($inscripcion);
    }

    
    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *  path="/api/inscripciones/{id}",
     *  summary="Actualizar una inscripción",
     *  description="Actualizar una inscripción por su id",
     *  operationId="updateInscripcion",
     * tags={"inscripciones"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID de la inscripción",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Datos de la inscripción",
     * @OA\JsonContent(
     * required={"comentarios","estado","equipo_id"},
     * @OA\Property(property="comentarios", type="string", example="Comentarios de la inscripción"),
     * @OA\Property(property="estado", type="string", example="pendiente"),
     * @OA\Property(property="equipo_id", type="integer", example="1")
     * )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Inscripción actualizada",
     *  @OA\JsonContent(ref="#/components/schemas/inscripciones")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Inscripción no encontrada"
     * )
     * ) 
    */
    public function update(UpdateInscripcionRequest $request, $id)
    {
        $inscripcion = Inscripcion::find($id);
        if(!$inscripcion){
            return response()->json(['error'=>'Inscripción no encontrada'],404);
        }

        $datos = $request->validated();
        $inscripcion->update($datos);
        return response()->json(['message'=>'Inscripción actualizada correctamente','data'=>$inscripcion]);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *  path="/api/inscripciones/{id}",
     *  summary="Eliminar una inscripción",
     *  description="Eliminar una inscripción por su id",
     *  operationId="deleteInscripcion",
     * tags={"inscripciones"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *    description="ID de la inscripción",
     *    required=true,
     *    @OA\Schema(
     *       type="integer"
     *    )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Inscripción eliminada"
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Inscripción no encontrada"
     * )
     * )
     */
    public function destroy($id)
    {
        $inscripcion = Inscripcion::find($id);
        if (!$inscripcion) {
            return response()->json(['error' => 'Inscripción no encontrada'], 404);
        }
        $inscripcion->delete();
        return response()->json([
            'message' => 'Inscripción eliminada con éxito'
        ]);
    }
}
