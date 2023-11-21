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
        Schema::create('pemesanan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penerbangan_id')->constrained('penerbangan');
            $table->integer('status');
            $table->integer('metode_pembayaran');
            $table->text('referensi_pembayaran');
            $table->foreignId('kelas_penerbangan_id')->constrained('kelas_penerbangan');
            $table->foreignId('userId')->constrained('users');
            $table->string('booking_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemesanan');
    }
};
