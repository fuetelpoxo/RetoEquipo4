<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Exceptions\UnauthorizedException;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $permission): Response
    {

        // Verifica si el usuario está autenticado
        if (Auth::guest()) {
            throw UnauthorizedException::notLoggedIn();
        }

        // Convierte el permiso en un array si es necesario
        $permissions = is_array($permission) ? $permission : explode('|', $permission);

        // Verifica si el usuario tiene alguno de los permisos requeridos
        foreach ($permissions as $permission) {
            if (Auth::user()->hasPermissionTo($permission)) {
                return $next($request);
            }
        }

        // Si no tiene los permisos, lanza una excepción
        throw UnauthorizedException::forPermissions($permissions);
    }
}
