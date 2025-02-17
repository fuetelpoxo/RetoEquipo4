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
             //Campos de la tabla/
             $table->longText('comentarios');
             $table->enum('estado', ['pendiente', 'aprobada', 'rechazada']);
             $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            //Campos de auditoría /
            $table->foreignId('usuarioIdCreacion')->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaCreacion')->useCurrent();
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
        Schema::dropIfExists('inscripciones');
    }
};
