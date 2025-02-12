<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Http\Requests\UserRequests\StoreUserRequest;
/**
 * @OA\Info(
 *      title="API de Gestión de Usuarios",
 *      version="1.0",
 *      description="API para la gestión de usuarios con Laravel",
 *      @OA\Contact(
 *          email="tuemail@example.com"
 *      ),
 *      @OA\License(
 *          name="MIT",
 *          url="https://opensource.org/licenses/MIT"
 *      )
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="Servidor API"
 * )
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Obtener todos los usuarios",
     *     tags={"Usuarios"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de usuarios",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/UserResponse"))
     *     )
     * )
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Crear un nuevo usuario",
     *     tags={"Usuarios"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","perfil"},
     *             @OA\Property(property="name", type="string", example="Borja Falque"),
     *             @OA\Property(property="email", type="string", format="email", example="borja@example.com"),
     *             @OA\Property(property="password", type="string", example="1234"),
     *             @OA\Property(property="perfil", type="string", enum={"entrenador", "director", "periodista", "administrador"}, example="entrenador")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Usuario creado")
     * )
     */
    public function store(StoreUserRequest $request)
    {
        // Crear el nuevo usuario con los datos validados
        $user = User::create([
            'name'=>$request->name,
            'email' => $request->email,  // Email del usuario
            'password' => Hash::make($request->password),  // Contraseña cifrada
            'activo' => $request->activo,  // Estado del usuario (activo)
            'perfil' => $request->perfil,  // Perfil del usuario
        ]);

        // Respuesta de éxito
        return response()->json([
            'message' => 'Usuario creado con éxito',
            'user' => $user
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Obtener un usuario por ID",
     *     tags={"Usuarios"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID del usuario", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Detalles del usuario", @OA\JsonContent(ref="#/components/schemas/UserResponse"))
     * )
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Actualizar un usuario",
     *     tags={"Usuarios"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID del usuario", @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Borja Falque"),
     *             @OA\Property(property="perfil", type="string", enum={"entrenador", "director", "periodista", "administrador"}, example="administrador")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Usuario actualizado")
     * )
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->only('name', 'perfil'));
        return new UserResource($user);
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Eliminar un usuario",
     *     tags={"Usuarios"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID del usuario", @OA\Schema(type="integer")),
     *     @OA\Response(response=204, description="Usuario eliminado")
     * )
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
