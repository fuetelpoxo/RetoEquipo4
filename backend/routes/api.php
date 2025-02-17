<?php
use App\Http\Controllers\Api\JugadorController;
use App\Http\Controllers\Api\EquipoController;
use App\Http\Controllers\Api\PublicacionController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
use App\Models\Publicacion;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

// Route::apiResource('donaciones', DonacionController::class);

Route::apiResource('equipos', EquipoController::class);

Route::apiResource('jugadores', JugadorController::class);

Route::apiResource('publicaciones', PublicacionController::class);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user(); // Devuelve la información del usuario autenticado
});

Route::post('/login', function (Request $request) {
    // Validar los datos de entrada
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 422);
    }

    // Intentar encontrar al usuario por su correo
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Generar el token de acceso
    $token = $user->createToken('MyAppToken')->plainTextToken;

    return response()->json([
        'token' => $token,
    ]);
});
