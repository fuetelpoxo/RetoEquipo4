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
        Schema::create('retos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 255);
            $table->text('texto')->nullable();
            $table->foreignId('estudio_id')->nullable()->constrained('estudios'); // Relación con estudios
            $table->foreignId('usuarioIdCreacion')->constrained('usuarios'); // Relación con usuarios
            $table->timestamp('fechaCreacion');
            $table->foreignId('usuarioIdActualizacion')->nullable()->constrained('usuarios'); // Relación con usuarios
            $table->timestamp('fechaActualizacion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retos');
    }
};
