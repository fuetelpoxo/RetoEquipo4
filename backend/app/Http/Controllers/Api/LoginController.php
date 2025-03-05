<?php

namespace App\Http\Controllers\Api;



use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index (LoginRequest $request)
    {
        $datosValidados = $request->validated();

        // Intentar autenticar al usuario
        if (!Auth::attempt($datosValidados)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        // Obtener el usuario autenticado
        $user = User::where('email', $request->email)->first();

        // Generar un token de acceso con Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver una respuesta con el token y un mensaje de éxito
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

}
