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
        $inscripcion = Inscripcion::create([
            'comentarios' => $request->comentarios,
            'estado' => $request->estado,
            'equipo_id' => $request->equipo_id,
            'usuarioIdCreacion' => Auth::id() ?? 1,
            'fechaCreacion' => now(),
            'usuarioIdActualizacion' => Auth::id() ?? 1,
            'fechaActualizacion' => now()
        ]);
        return response()->json([
            'message' => 'Inscripción creada con éxito',
            'inscripcion' => $inscripcion
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        $inscripcion=Inscripcion::find($id);
        return new InscripcionResource($inscripcion);
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInscripcionRequest $request, $id)
    {
        $inscripcion = Inscripcion::findOrfail($id);
        $inscripcion->update($request->validated());
        return new InscripcionResource($inscripcion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $inscripcion = Inscripcion::find($id);
        $inscripcion->delete();
        return response()->json([
            'message' => 'Inscripción eliminada con éxito'
        ]);
    }
}
