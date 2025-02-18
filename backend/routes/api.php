<?php
use App\Http\Controllers\Api\JugadorController;
use App\Http\Controllers\Api\EquipoController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

// Route::apiResource('donaciones', DonacionController::class);

Route::apiResource('equipos', EquipoController::class);

Route::apiResource('jugadores', JugadorController::class);
