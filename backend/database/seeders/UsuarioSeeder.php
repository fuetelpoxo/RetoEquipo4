<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'email' => 'borja@example.com',
                'password' => Hash::make('1234'),
                'activo' => 1,
                'perfil' => 'administrador',
            ],
            [
                'email' => 'nestor@example.com',
                'password' => Hash::make('1234'),
                'activo' => 1,
                'perfil' => 'administrador',
            ],
        ]);
    }
}
