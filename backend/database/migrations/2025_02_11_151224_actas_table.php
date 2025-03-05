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
            $table->foreignId('jugador_id')->nullable()->constrained('jugadores'); // Clave foránea para jugador
            $table->enum('incidencia', ['amarilla','roja','lesion','cambio','gol','falta','penalti'])->nullable();
            $table->time('hora')->nullable();
            $table->text('comentario')->nullable();
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
        Schema::dropIfExists('actas');
    }
};
