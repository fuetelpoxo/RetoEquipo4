<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
class PermissionSeeder extends Seeder
{
    public function run()
    {
        // Limpiar caché de permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Definir controladores y acciones
        $controllers = [
            'ActaController', 'CicloController', 'DonacionController', 'EquipoController',
            'ImagenController', 'InscripcionController', 'JugadorController', 'OngController',
            'PartidoController', 'PatrocinadorController', 'PublicacionController', 'UserController'
        ];

        $actions = ['index', 'show', 'store', 'update', 'destroy'];

        // Crear permisos
        foreach ($controllers as $controller) {
            foreach ($actions as $action) {
                Permission::create(['name' => "{$controller}.{$action}"]);
            }
        }

        // Crear roles y asignar permisos
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $director = Role::create(['name' => 'director']);
        $director->givePermissionTo([
            'EquipoController.index', 'EquipoController.show', 'EquipoController.store', 'EquipoController.update', 'EquipoController.destroy',
            'JugadorController.index', 'JugadorController.show', 'JugadorController.store', 'JugadorController.update', 'JugadorController.destroy',
            'InscripcionController.index', 'InscripcionController.show', 'InscripcionController.store', 'InscripcionController.update', 'InscripcionController.destroy',
        ]);
        $director->givePermissionTo(Permission::where('name', 'like', '%.index')->orWhere('name', 'like', '%.show')->get());

        $periodista = Role::create(['name' => 'periodista']);
        $periodista->givePermissionTo([
            'ImagenController.index', 'ImagenController.show', 'ImagenController.store', 'ImagenController.update', 'ImagenController.destroy',
            'PublicacionController.index', 'PublicacionController.show', 'PublicacionController.store', 'PublicacionController.update', 'PublicacionController.destroy',
        ]);
        $periodista->givePermissionTo(Permission::where('name', 'like', '%.index')->orWhere('name', 'like', '%.show')->get());

        $entrenador = Role::create(['name' => 'entrenador']);
        $entrenador->givePermissionTo(Permission::where('name', 'like', '%.index')->orWhere('name', 'like', '%.show')->get());
    }
}
