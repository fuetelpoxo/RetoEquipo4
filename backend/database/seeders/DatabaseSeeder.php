<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(OngSeeder::class);
        $this->call(FamiliaSeeder::class);
        $this->call(CentroSeeder::class);
        $this->call(PabellonSeeder::class);
        $this->call(CicloSeeder::class);
        $this->call(RetoSeeder::class);
        $this->call(EstudioSeeder::class);
        $this->call(EquipoSeeder::class);
        $this->call(JugadorSeeder::class);
    }
}
