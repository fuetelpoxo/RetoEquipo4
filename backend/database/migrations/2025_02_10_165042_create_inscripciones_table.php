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
        Schema::create('inscripciones', function (Blueprint $table) {
            $table->id();
            //Campos de auditoría /
            $table->unsignedBigInteger('usuarioIdCreacion');
            $table->unsignedBigInteger('usuarioIdActualizacion')->nullable();
            $table->timestamp('fechaCreacion')->useCurrent();
            $table->timestamp('fechaActualizacion')->nullable()->useCurrentOnUpdate();
            $table->timestamps();
            //Campos de la tabla/
            $table->longText('comentarios');
            // $table->enum()
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripciones');
    }
};
