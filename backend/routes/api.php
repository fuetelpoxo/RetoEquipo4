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
use App\Http\Controllers\Api\EstudioController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\OngController;
use App\Http\Controllers\Api\RetoController;
use Illuminate\Support\Facades\Route;


Route::middleware('permission:UserController.*')->group(function () {
    Route::apiResource('users', UserController::class);
});

Route::apiResource('users', UserController::class);
Route::apiResource('login', [LoginController::class]);

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

Route::apiResource('ongs', OngController::class);

Route::get('/estudios', [EstudioController::class, 'index']);  // Mostrar todos los estudios
Route::get('/estudios/{id}', [EstudioController::class, 'show']); // Mostrar un estudio por ID

Route::get('/retos', [RetoController::class, 'index']);  // Mostrar todos los estudios
Route::get('/retos/{id}', [RetoController::class, 'show']); // Mostrar un estudio por ID