<?php

use App\Http\Controllers\Api\ActasController;
use App\Http\Controllers\Api\JugadorController;
use App\Http\Controllers\Api\EquipoController;
use App\Http\Controllers\Api\ImagenController;
use App\Http\Controllers\Api\PublicacionController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
use App\Models\Publicacion;
use Illuminate\Support\Facades\Route;
use App\Models\User;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

// Route::apiResource('donaciones', DonacionController::class);

Route::apiResource('equipos', EquipoController::class);

Route::apiResource('jugadores', JugadorController::class);

Route::apiResource('publicaciones', PublicacionController::class);

Route::apiResource('actas',ActasController::class);

Route::apiResource('imagenes',ImagenController::class);
