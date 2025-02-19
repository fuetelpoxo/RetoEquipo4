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
            $table->foreignId('usuarioIdCreacion')->nullable()->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaCreacion')->nullable()->useCurrent();
            $table->foreignId('usuarioIdActualizacion')->nullable()->constrained('users'); // Relación con la tabla de usuarios
            $table->timestamp('fechaActualizacion')->nullable()->useCurrent();
            //Campos de la tabla
            $table->text('url');
            $table->text('nombre');
            //Claves foraneas
            $table->foreignId('equipo_id')->nullable()->constrained('equipos')->onDelete('cascade');
            $table->foreignId('jugador_id')->nullable()->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('partido_id')->nullable()->constrained('partidos')->onDelete('cascade');
            $table->foreignId('patrocinador_id')->nullable()->constrained('patrocinadores')->onDelete('cascade');
            $table->foreignId('reto_id')->nullable()->constrained('retos')->onDelete('cascade');
            $table->foreignId('ong_id')->nullable()->constrained('ongs')->onDelete('cascade');
            $table->foreignId('publicacion_id')->nullable()->constrained('publicaciones')->onDelete('cascade');
            $table->foreignId('pabellon_id')->nullable()->constrained('pabellones')->onDelete('cascade');
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
