<?php
namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $routeMiddleware = [
        // Middlewares existentes
        'auth' => \App\Http\Middleware\Authenticate::class,
        'permission' => \App\Http\Middleware\CheckPermission::class, // Registrar el middleware
    ];
}
