<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RetoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("retos")->insert([
            ['nombre'=>'Jabones solidarios'],
            ['nombre'=> 'Tratamientos hidrotermales'],
            ['nombre'=> 'Masajes deportivos'],
            ['nombre'=>'Realizar la sonorización y retransmisión de los partidos por megafonía y radio en streaming'],
            ['nombre'=> 'Realizar unos reportajes de resumen del evento'],
            ['nombre'=> 'Monitorización ritmo cardiaco'],
            ['nombre'=>'Entrenamiento automatizado'],
            ['nombre'=> 'Despliegue de un servidor de virtualización para el alojamiento de las páginas web de la sede del torneo'],
            ['nombre'=> 'Despliegue de red para un evento deportivo'],
            ['nombre'=> 'Diseño y desarrollo web sede Torrelavega'],
            ['nombre'=> 'Gestión de una empresa de eventos deportivos'],
            ['nombre'=> 'Exhibición de un vehículo inercial para descensos'],
            ['nombre'=>'Merchandising'],
            ['nombre'=> 'Food Truck'],
            ['nombre'=> 'Diseño Logo'],
            ['nombre'=> 'Exposición Barriografía de la Inclusión'],
            
        ]);
    }
}
