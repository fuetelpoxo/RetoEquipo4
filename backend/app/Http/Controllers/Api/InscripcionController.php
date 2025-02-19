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
    public function index()
    {
      $inscripcion = Inscripcion::all();
      return InscripcionResource::collection($inscripcion);
    }


    /**
     * Store a newly created resource in storage.
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
