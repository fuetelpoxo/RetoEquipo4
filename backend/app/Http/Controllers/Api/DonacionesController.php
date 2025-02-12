<?php

declare(strict_types = 1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donacion;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DonacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donaciones = Donacion::all();

        $data = [
            'donaciones' => $donaciones,
            'status'     => 200,
        ];

        return response()->json([$data,200]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Donacion $donacion): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donacion $donacion): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donacion $donacion): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donacion $donacion): void
    {
        //
    }
}
