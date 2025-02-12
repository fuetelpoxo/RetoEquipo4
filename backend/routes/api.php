<?php

declare(strict_types = 1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Pecee\SimpleRouter\SimpleRouter as Router;
//definimos la primera ruta por get en el raiz que muestra hola mundo
Router::get('/',function(){
    return "Hola mundo";
});
//definimos por ejemplo nuestra primera entrada en la api
Router::get('/api',function(){
    return "Esta es la entrada a nuestra API REST";
});

//Route::get('/user', fn (Request $request) => $request->user())->middleware('auth:sanctum');
