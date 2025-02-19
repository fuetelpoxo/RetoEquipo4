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
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipoL_id')->nullable()->constrained('equipos')->onDelete('cascade'); // Relación con equipos (equipo local)
            $table->foreignId('equipoV_id')->nullable()->constrained('equipos')->onDelete('cascade'); // Relación con equipos (equipo visitante)
            $table->date('fecha')->nullable();
            $table->time('hora')->nullable();
            $table->integer('golesL')->nullable()->default(0); // Goles equipo local
            $table->integer('golesV')->nullable()->default(0); // Goles equipo visitante
            $table->foreignId('pabellon_id')->nullable()->constrained('pabellones'); // Relación con pabellones
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
        Schema::dropIfExists('partidos');
    }
};
