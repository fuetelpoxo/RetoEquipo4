<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PabellonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("pabellones")->insert([
            ['nombre'=>'Pabellon Municipal La Habana Vieja',
            'direccion'=> 'Pabellón Deportivo, C. Pintor Varela, s/n, 39300 Torrelavega, Cantabria']
        ]);
    }
}
