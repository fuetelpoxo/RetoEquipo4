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
        Schema::create('donaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ong_id')->constrained()->onDelete('cascade'); // Relación con la tabla ongs
            $table->decimal('kilos', 8, 2); // Para los kilos, puedes usar decimal o float
            $table->decimal('importe', 10, 2); // Importe recaudado
            $table->foreignId('usuarioIdCreacion')->constrained('usuarios'); // Relación con la tabla de usuarios
            $table->timestamp('fechaCreacion')->useCurrent();
            $table->foreignId('usuarioIdActualizacion')->nullable()->constrained('usuarios'); // Relación con la tabla de usuarios
            $table->timestamp('fechaActualizacion')->nullable()->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donaciones');
    }
};
