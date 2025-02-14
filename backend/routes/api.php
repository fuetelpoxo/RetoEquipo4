<?php


use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DonacionController;
use App\Http\Controllers\Api\EquipoController;
use App\Http\Controllers\Api\JugadorController;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

Route::apiResource('donaciones', DonacionController::class);

Route::apiResource('equipos', EquipoController::class);

Route::apiResource('jugadores', JugadorController::class);
