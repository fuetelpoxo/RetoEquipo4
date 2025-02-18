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
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipo_id')->constrained('equipos');
            $table->string('nombre');
            $table->string('apellido1');
            $table->string('apellido2');
            $table->enum('tipo', ['jugador', 'entrenador', 'capitan']);
            $table->foreignId('estudio_id')->constrained('estudios')->onDelete('cascade');
            $table->string('dni');
            $table->string('email');
            $table->string('telefono');
            $table->foreignId('usuarioIdCreacion')->nullable()->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaCreacion')->nullable()->useCurrent();
            $table->foreignId('usuarioIdActualizacion')->nullable()->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaActualizacion')->nullable()->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugadores');
    }
};
