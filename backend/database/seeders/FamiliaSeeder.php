<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class FamiliaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("familias")->insert([
            ['nombre'=>'Imagen Personal'],
            ['nombre'=> 'Imagen y Sonido'],
            ['nombre'=> 'Electricidad y Electronica'],
            ['nombre'=>'Informatica y Comunicaciones'],
            ['nombre'=> 'Transporte y Mantenimiento de Vehiculos'],
            ['nombre'=> 'Textil, Confeccion y Piel'],
            ['nombre'=>'Hosteleria y Turismo'],
            ['nombre'=> 'Comercio y Marketing'],
            ['nombre'=> 'Servicios Socioculturales a la comunidad'],
        ]);
    }
}
