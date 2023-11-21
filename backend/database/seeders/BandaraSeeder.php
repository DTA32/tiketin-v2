<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\bandara;

class BandaraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama_bandara' => 'Bandara Internasional Soekarno-Hatta',
                'kode_bandara' => 'CGK',
                'kota' => 'Jakarta',
            ],
            [
                'nama_bandara' => 'Bandara Internasional Ngurah Rai',
                'kode_bandara' => 'DPS',
                'kota' => 'Denpasar',
            ],
            [
                'nama_bandara' => 'Bandara Internasional Juanda',
                'kode_bandara' => 'SUB',
                'kota' => 'Surabaya',
            ],
            [
                'nama_bandara' => 'Bandara Internasional Husein Sastranegara',
                'kode_bandara' => 'BDO',
                'kota' => 'Bandung',
            ],
            [
                'nama_bandara' => 'Bandara Internasional Adisutjipto',
                'kode_bandara' => 'JOG',
                'kota' => 'Yogyakarta',
            ]
        ];
        foreach ($data as $d) {
            bandara::create($d);
        }
    }
}
