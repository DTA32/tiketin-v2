<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\pemesanan;

class PemesananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pemesanan = [
            [
                'penerbangan_id' => 1,
                'status' => 1,
                'metode_pembayaran' => 3,
                'referensi_pembayaran' => 'QRIS-1234',
                'kelas_penerbangan_id' => 1,
                'userId' => 2,
                'booking_code' => 'ABC123',
            ],
            [
                'penerbangan_id' => 1,
                'status' => 0,
                'metode_pembayaran' => 0,
                'referensi_pembayaran' => '',
                'kelas_penerbangan_id' => 4,
                'userId' => 2,
                'booking_code' => 'ZYX987',
            ]
        ];
        foreach ($pemesanan as $p) {
            pemesanan::create($p);
        }
    }
}
