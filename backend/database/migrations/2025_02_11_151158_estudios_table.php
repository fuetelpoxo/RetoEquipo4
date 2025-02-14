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
        $table->foreignId('centro_id')->constrained('centros');
        $table->foreignId('ciclo_id')->constrained('ciclos');
        $table->integer('curso')->nullable();
        $table->timestamps();
    });

    Schema::table('estudios', function (Blueprint $table) {
        $table->unique(['centro_id', 'ciclo_id', 'curso']);
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
