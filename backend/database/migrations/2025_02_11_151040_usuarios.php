<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();  // Esto crea el campo 'id' como PRIMARY KEY
            $table->string('email', 45)->unique();  // Esto crea el campo 'email' como VARCHAR(45)
            $table->string('password', 255);  // Esto crea el campo 'password' como VARCHAR(255)
            $table->tinyInteger('activo');  // Esto crea el campo 'activo' como TINYINT
            $table->enum('perfil', ['administrador', 'entrenador', 'director', 'periodista']);  // Esto crea el campo 'perfil' como ENUM
            $table->timestamps();  // Esto crea los campos 'created_at' y 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
