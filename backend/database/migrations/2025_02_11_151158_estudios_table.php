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
        Schema::create('estudios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('centro_id')->constrained('centros');  // Relación con centros
            $table->foreignId('ciclo_id')->constrained('ciclos');    // Relación con ciclos
            $table->integer('curso');  // El campo curso es un entero
            $table->foreignId('usuarioIdCreacion')->constrained('usuarios');  // Relación con usuarios
            $table->timestamp('fechaCreacion');
            $table->foreignId('usuarioIdActualizacion')->constrained('usuarios');  // Relación con usuarios
            $table->timestamp('fechaActualizacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudios');
    }
};
