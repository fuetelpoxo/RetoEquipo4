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
        $familias = DB::table('familias')->pluck('id', 'nombre'); // Obtiene los IDs de las familias por nombre
        
        DB::table("ciclos")->insert([
            ['nombre' => 'CFGS Estética Integral y Bienestar', 'familia_id' => $familias['Imagen Personal']],
            ['nombre' => 'CFGS Sonido para audiovisuales y espectáculos', 'familia_id' => $familias['Imagen y Sonido']],
            ['nombre' => 'CFGM video DJ y sonido', 'familia_id' => $familias['Imagen y Sonido']],
            ['nombre' => 'CFGS Mantenimiento Electrónico', 'familia_id' => $familias['Electricidad y Electronica']],
            ['nombre' => 'CFGS Automatización y Robótica Industrial', 'familia_id' => $familias['Informatica y Comunicaciones']],
            ['nombre' => 'CFGS Administración de Sistemas informáticos en RED', 'familia_id' => $familias['Informatica y Comunicaciones']],
            ['nombre' => 'CFGM Sistemas Microinformáticos y Redes', 'familia_id' => $familias['Informatica y Comunicaciones']],
            ['nombre' => 'CFGS Desarrollo de Aplicaciones Web', 'familia_id' => $familias['Informatica y Comunicaciones']],
            ['nombre' => 'CFGM Gestión Administrativa', 'familia_id' => $familias['Comercio y Marketing']],
            ['nombre' => 'CFGM de Carrocería', 'familia_id' => $familias['Transporte y Mantenimiento de Vehiculos']],
            ['nombre' => 'CFGB de Tapicería y Cortinaje', 'familia_id' => $familias['Textil, Confeccion y Piel']],
            ['nombre' => 'GM servicios de restauración y PFB Cocina y restauración', 'familia_id' => $familias['Hosteleria y Turismo']],
            ['nombre' => 'CFGM Comercialización de productos alimentarios', 'familia_id' => $familias['Hosteleria y Turismo']],
            ['nombre' => 'CGSFP Integración Social', 'familia_id' => $familias['Servicios Socioculturales a la comunidad']],
        ]);
    }
}
