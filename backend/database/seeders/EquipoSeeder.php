<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('equipos')->insert([
            ['nombre'=>'ChatGepeterosFC','centro_id'=>1,'grupo'=>'B'],
            ['nombre' => 'Rojos Unidos', 'centro_id' => 2, 'grupo' => 'A'],
            ['nombre' => 'Leones Dorados', 'centro_id' => 3, 'grupo' => 'B'],
            ['nombre' => 'Guerreros del Sol', 'centro_id' => 1, 'grupo' => 'A'],
            ['nombre' => 'Titanes Azules', 'centro_id' => 2, 'grupo' => 'B'],
            ['nombre' => 'Cóndores Negros', 'centro_id' => 3, 'grupo' => 'A'],
            ['nombre' => 'Panteras Rojas', 'centro_id' => 1, 'grupo' => 'A'],
            ['nombre' => 'Dragones Plateados', 'centro_id' => 2, 'grupo' => 'B'],
            ['nombre' => 'Águilas Doradas', 'centro_id' => 3, 'grupo' => 'A'],
            ['nombre' => 'Búfalos Verdes', 'centro_id' => 1, 'grupo' => 'B']
        ]);
    }
}
