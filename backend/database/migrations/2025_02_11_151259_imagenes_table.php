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
        Schema::create('imagenes', function (Blueprint $table) {
            $table->id();
            //Campos de auditoria
            $table->foreignId('usuarioIdCreacion')->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaCreacion')->useCurrent();
            $table->foreignId('usuarioIdActualizacion')->nullable()->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaActualizacion')->nullable()->useCurrent();
            //Campos de la tabla
            $table->text('url');
            $table->text('nombre');
            //Claves foraneas
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('partido_id')->constrained('partidos')->onDelete('cascade');
            $table->foreignId('patrocinador_id')->constrained('patrocinadores')->onDelete('cascade');
            $table->foreignId('reto_id')->constrained('retos')->onDelete('cascade');
            $table->foreignId('ong_id')->constrained('ongs')->onDelete('cascade');
            $table->foreignId('publicacion_id')->constrained('publicaciones')->onDelete('cascade');
            $table->foreignId('pabellon_id')->constrained('pabellones')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagenes');
    }
};
