<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Crear usuario admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        // Crear usuario director
        $director = User::create([
            'name' => 'Director',
            'email' => 'director@example.com',
            'password' => bcrypt('password'),
        ]);
        $director->assignRole('director');

        // Crear usuario periodista
        $periodista = User::create([
            'name' => 'Periodista',
            'email' => 'periodista@example.com',
            'password' => bcrypt('password'),
        ]);
        $periodista->assignRole('periodista');

        // Crear usuario entrenador
        $entrenador = User::create([
            'name' => 'Entrenador',
            'email' => 'entrenador@example.com',
            'password' => bcrypt('password'),
        ]);
        $entrenador->assignRole('entrenador');
    }
}
