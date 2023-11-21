<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\pemesanan_penumpang;

class PemesananPenumpangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pemesananP = [
            [
                'pemesanan_id' => '1',
                'nama' => fake()->name(),
                'kursi_penerbangan' => '1A'
            ],
            [
                'pemesanan_id' => '1',
                'nama' => fake()->name(),
                'kursi_penerbangan' => '1B'
            ],
            [
                'pemesanan_id' => '2',
                'nama' => fake()->name(),
                'kursi_penerbangan' => '2A'
            ]
        ];
        foreach ($pemesananP as $pp) {
            pemesanan_penumpang::create($pp);
        }
    }
}
