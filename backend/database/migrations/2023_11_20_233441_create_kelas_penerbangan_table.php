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
        Schema::create('kelas_penerbangan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penerbangan_id')->constrained('penerbangan');
            $table->integer('tipe_kelas');
            $table->unsignedBigInteger('harga');
            $table->integer('jumlah_kursi');
            $table->json('seat_layout');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas_penerbangan');
    }
};
