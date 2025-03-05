<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guest()) {
            return response()->json(['message' => 'No autenticado.'], 401);
        }

        return $next($request);
    }
}
