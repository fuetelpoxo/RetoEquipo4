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
        Schema::create('patrocinadores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 45); // Nombre del patrocinador
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
        Schema::dropIfExists('patrocinadores');
    }
};
