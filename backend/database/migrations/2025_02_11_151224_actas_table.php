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
        Schema::create('actas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained('partidos'); // Clave foránea para partido
            $table->foreignId('jugador_id')->constrained('jugadores'); // Clave foránea para jugador
            $table->string('incidencia');
            $table->time('hora');
            $table->text('comentario');
            $table->foreignId('usuarioIdCreacion')->constrained('usuarios'); // Si hay tabla de usuarios
            $table->timestamp('fechaCreacion');
            $table->foreignId('usuarioIdActualizacion')->constrained('usuarios'); // Si hay tabla de usuarios
            $table->timestamp('fechaActualizacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actas');
    }
};
