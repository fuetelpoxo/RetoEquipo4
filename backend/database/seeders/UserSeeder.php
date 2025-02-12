<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'borja',
                'email' => 'borja@example.com',
                'password' => Hash::make('1234'),
                'activo' => true,
                'perfil' => 'administrador',
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'nestor',
                'email' => 'nestor@example.com',
                'password' => Hash::make('1234'),
                'activo' => true,
                'perfil' => 'administrador',
                'remember_token' => Str::random(10),
            ]
        ]);
    }
}
