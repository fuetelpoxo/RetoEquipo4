<?php

declare(strict_types = 1);

use Pecee\SimpleRouter\SimpleRouter as Router;
use App\Http\Controllers\Api\DonacionesController;

Router::get('/donaciones', [DonacionesController::class, 'index']);
Router::get('/', fn () => 'Bienvenido al API de Donaciones');
