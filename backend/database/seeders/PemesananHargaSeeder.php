<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\pemesanan;
use App\Models\pemesanan_harga;

class PemesananHargaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pemesananHarga = [
            [
                'pemesanan_id' => 1,
                'biaya_dasar' => Pemesanan::find(1)->kelas_penerbangan->harga,
                'kuantitas' => 2,
                'biaya_layanan' => 10000,
                'total' => Pemesanan::find(1)->kelas_penerbangan->harga * 2 + 10000,
            ],
            [
                'pemesanan_id' => 2,
                'biaya_dasar' => Pemesanan::find(2)->kelas_penerbangan->harga,
                'kuantitas' => 1,
                'biaya_layanan' => 10000,
                'total' => Pemesanan::find(2)->kelas_penerbangan->harga + 10000,
            ]
        ];
        foreach ($pemesananHarga as $ph) {
            pemesanan_harga::create($ph);
        }
    }
}
