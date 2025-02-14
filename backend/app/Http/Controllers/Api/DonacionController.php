<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donacion;
use App\Http\Requests\DonacionRequests\StoreDonacionRequest;
use App\Http\Requests\DonacionRequests\UpdateDonacionRequest;
use App\Http\Resources\DonacionResource;
use Illuminate\Support\Facades\Log;

class DonacionController extends Controller
{
    public function index()
    {
        $donaciones = Donacion::all();
        return DonacionResource::collection($donaciones);
    }

    public function store(StoreDonacionRequest $request)
{
    // Crear la donación
    $donacion = Donacion::create($request->validated());
    return new DonacionResource($donacion);
}

    public function show($id)
    {
        $donacion = Donacion::findOrFail($id);
        return new DonacionResource($donacion);
    }

    public function update(UpdateDonacionRequest $request, $id)
    {
        $donacion = Donacion::findOrFail($id);
        $donacion->update($request->validated());
        return new DonacionResource($donacion);
    }

    public function destroy($id)
    {
        $donacion = Donacion::findOrFail($id);
        $donacion->delete();
        return response()->noContent();
    }
}
