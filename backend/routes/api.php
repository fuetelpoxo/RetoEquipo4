<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DonacionController;
use App\Http\Controllers\Api\EquipoController;
use App\Http\Controllers\Api\JugadorController;
use App\Http\Controllers\Api\InscripcionController;
use App\Http\Controllers\Api\PatrocinadorController;
use App\Http\Controllers\Api\PartidoController;
use App\Http\Controllers\Api\ActaController;
use App\Http\Controllers\Api\ImagenController;
use App\Http\Controllers\Api\PublicacionController;
use App\Http\Controllers\Api\CicloController;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

Route::apiResource('donaciones', DonacionController::class);

Route::apiResource('equipos', EquipoController::class);

Route::apiResource('jugadores', JugadorController::class);

Route::apiResource('inscripciones', InscripcionController::class);

Route::apiResource('patrocinadores', PatrocinadorController::class);

Route::apiResource('partidos', PartidoController::class);

Route::apiResource('actas', ActaController::class);

Route::apiResource('imagenes', ImagenController::class);

Route::apiResource('publicaciones', PublicacionController::class);

Route::apiResource('ciclos', CicloController::class);
