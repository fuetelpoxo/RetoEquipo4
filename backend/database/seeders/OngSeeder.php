<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OngSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("ongs")->insert([
            ['nombre'=>'Cruz Roja','landingPage'=>'https://www2.cruzroja.es/'],
        ]);
    }
}
