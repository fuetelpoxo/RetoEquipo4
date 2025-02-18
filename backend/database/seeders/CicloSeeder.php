<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CicloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ciclos')->insert([
            ['nombre' => 'Estética Integral y Bienestar', 'familia_id' => 1],
            ['nombre' => 'Sonido para audiovisuales y espectáculos', 'familia_id' => 2],
            ['nombre' => 'Video DJ y Sonido', 'familia_id' => 2],
            ['nombre' => 'Mantenimiento Electrónivo', 'familia_id' => 3],
            ['nombre' => 'Automatización y Robótica Industrial', 'familia_id' => 3],
            ['nombre' => 'Administración de Sistemas Informáticos en Red', 'familia_id' => 4],
            ['nombre' => 'Sistemas microinformáticos y Redes', 'familia_id' => 4],
            ['nombre' => 'Desarrollo de Aplicaciones Web', 'familia_id' => 4],
            ['nombre' => 'Gestión Administrativa', 'familia_id' => 4],
            ['nombre' => 'Carrocería', 'familia_id' => 5],
            ['nombre' => 'Tapicería y Cortinaje', 'familia_id' => 6],
            ['nombre' => 'Servicios de restauración', 'familia_id' => 7],
            ['nombre' => 'Cocina y Restauración', 'familia_id' => 7],
            ['nombre' => 'Comercialización de productos alimentarios', 'familia_id' => 8],
            ['nombre' => 'Integración Social', 'familia_id' => 9],
        ]);
    }
}
