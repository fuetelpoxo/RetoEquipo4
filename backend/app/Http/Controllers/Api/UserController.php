<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Http\Requests\UserRequests\StoreUserRequest;
use App\Http\Requests\UserRequests\UpdateUserRequest;


class UserController extends Controller
{
   /**
     * @OA\Get(
     *  path="/api/users",
     *  summary="Obtener todos los usuarios",
     *  description="Obtener todos los usuarios",
     *  operationId="getUsers",
     *  tags={"users"},
     * @OA\Response(
     * response=200,
     * description="Lista de usuarios",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(ref="#/components/schemas/users")
     * )
     * )
     * )
     */
    public function index()
    {
        $users = User::all();
        return UserResource::collection(User::all());

    }
    /**
     * @OA\Post(
     *  path="/api/users",
     *  summary="Crear un usuario",
     *  description="Crear un nuevo usuario",
     *  operationId="postUser",
     *  tags={"users"},
     * @OA\RequestBody(
     * required=true,
     * description="Datos del usuario",
     * @OA\JsonContent(
     * required={"name","email","password","activo","perfil"},
     * @OA\Property(property="name", type="string", example="Usuario 1"),
     * @OA\Property(property="email", type="string", example="user@example.com"),
     * @OA\Property(property="password", type="string", example="12345678"),
     * @OA\Property(property="activo", type="boolean", example="1"),
     * @OA\Property(property="perfil", type="string", example="administrador")
     * )
     * ),
     * @OA\Response(
     *  response=201,
     *  description="Usuario creado",
     *  @OA\JsonContent(ref="#/components/schemas/users")
     * ),
     * @OA\Response(
     *  response=422,
     *  description="Datos no válidos"
     * )
     * )    
     */
    
    public function store(StoreUserRequest $request)
{
    // Crear el nuevo usuario con los datos validados
    $user = User::create($request->validated());
    return response()->json([
        'message' => 'Usuario creado con éxito',
        'data' => new UserResource($user)  
    ], 201);
}


    /**
     * @OA\Get(
     *  path="/api/users/{id}",
     *  summary="Mostrar usuario",
     *  description="Mostrar un usuario por su id",
     *  operationId="getUser",
     *  tags={"users"},
     * @OA\Parameter(
     *  name="id",
     *  in="path",
     *  description="ID del usuario",
     *  required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Usuario mostrado",
     *  @OA\JsonContent(ref="#/components/schemas/users")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Usuario no encontrado"
     * )
     * )
     */
    public function show(User $user)
    {
        if(!$user){
            return response()->json(['error'=>'Usuario no encontrado'],404);
        }
        return new UserResource($user);
    }

    /**
     * @OA\Put(
     *  path="/api/users/{id}",
     *  summary="Actualizar un usuario",
     *  description="Actualizar un usuario por su id",
     *  operationId="updateUser",
     * tags={"users"},
     * @OA\Parameter(
     *    name="id",
     *    in="path",
     *   description="Id del usuario",
     *  required=true,
     * @OA\Schema(type="integer",example="1")
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Datos del usuario",
     * @OA\JsonContent(
     * required={"name","email","password","activo","perfil"},
     * @OA\Property(property="name", type="string", example="Usuario1"),
     * @OA\Property(property="email", type="string", example="user@example.com"),
     * @OA\Property(property="password", type="string", example="12345678"),
     * @OA\Property(property="activo", type="boolean", example="1"),
     * @OA\Property(property="perfil", type="string", example="administrador")
     * )
     * ),
     * @OA\Response(
     *  response=200,
     *  description="Usuario actualizado",
     *  @OA\JsonContent(ref="#/components/schemas/users")
     * ),
     * @OA\Response(
     *  response=404,
     *  description="Usuario no encontrado"
     * )
     * )
     */
    public function update(UpdateUserRequest $request, $id)
{
    // Solo se actualizan los campos validados
    $user = User::find($id);
    if(!$user){
        return response()->json(['error'=>'Usuario no encontrado'],404);
    }
    $datos = $request->validated();
    $user->update($datos);
    return response()->json(['message'=>'Usuario actualizado correctamente','data'=>$user]);
}
/**
 * @OA\Delete(
 *  path="/api/users/{id}",
 *  summary="Eliminar un usuario",
 *  description="Eliminar un usuario por su id",
 *  operationId="deleteUser",
 *  tags={"users"},
 *  @OA\Parameter(
 *      name="id",
 *      in="path",
 *      description="Id del usuario",
 *   required=true,
 *   @OA\Schema(type="integer",example="1")
 *  ),
 *  @OA\Response(
 *  response=200,
 *  description="Usuario eliminado"
 * ),
 *  @OA\Response(
 *  response=404,
 *  description="Usuario no encontrado"
 *  )
 * )
 */
   
    public function destroy($id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json(['error'=>'Usuario no encontrado'],404);
        }
        $user->delete();
        return response()->json(['message'=>'Usuario eliminado correctamente']);
    }
}
