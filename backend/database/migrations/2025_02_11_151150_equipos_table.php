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
        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('centro_id')->constrained('centros'); // Relación con centros
            $table->string('nombre', 100);
            $table->string('grupo', 50);
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
        Schema::dropIfExists('equipos');
    }
};
