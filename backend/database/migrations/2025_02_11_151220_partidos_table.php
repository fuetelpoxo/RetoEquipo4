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
            $table->foreignId('equipoL_id')->constrained('equipos'); // Relación con equipos (equipo local)
            $table->foreignId('equipoV_id')->constrained('equipos'); // Relación con equipos (equipo visitante)
            $table->date('fecha');
            $table->time('hora');
            $table->integer('golesL')->default(0); // Goles equipo local
            $table->integer('golesV')->default(0); // Goles equipo visitante
            $table->foreignId('pabellon_id')->constrained('pabellones'); // Relación con pabellones
            $table->foreignId('usuarioIdCreacion')->constrained('usuarios'); // Relación con usuarios
            $table->timestamp('fechaCreacion');
            $table->foreignId('usuarioIdActualizacion')->constrained('usuarios'); // Relación con usuarios
            $table->timestamp('fechaActualizacion');
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
