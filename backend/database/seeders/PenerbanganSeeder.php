<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\penerbangan;

class PenerbanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $maskapai = ['Garuda Indonesia', 'Air Asia', 'Lion Air', 'Citilink'];
        $tipe_pesawat = ['Boeing 737', 'Airbus A320', 'Sukhoi Superjet 100'];
        $penerbangan = [];

        // static data generate for order history
        $penStatic = [
            'bandara_asal_id' => 1,
            'bandara_tujuan_id' => 2,
            'waktu_berangkat' => date('Y-m-d H:i:s', strtotime('-1 day')),
            'waktu_sampai' => date('Y-m-d H:i:s', strtotime('-21 hours')),
            'maskapai' => $maskapai[rand(0, 3)],
            'tipe_pesawat' => $tipe_pesawat[rand(0, 2)],
        ];
        array_push($penerbangan, $penStatic);

        // dynamic data generate
        for ($i=1; $i <= 3 ; $i++) {
            for ($j=1; $j < $i; $j++) {
                for ($k=0; $k <3; $k++){
                    $baseA = date('Y-m-d H:i:s', strtotime('+1 day', strtotime(date('Y-m-d') . ' ' . fake()->time('H') . ':00:00')));
                    $penA = [
                        'bandara_asal_id' => $i,
                        'bandara_tujuan_id' => $j,
                        'waktu_berangkat' => $baseA,
                        'waktu_sampai' => date('Y-m-d H:i:s', strtotime('+' . rand(2, 4) . ' hours', strtotime($baseA))),
                        'maskapai' => $maskapai[rand(0, 3)],
                        'tipe_pesawat' => $tipe_pesawat[rand(0, 2)],
                    ];
                    array_push($penerbangan, $penA);
                    $baseB = date('Y-m-d H:i:s', strtotime('+1 day', strtotime(date('Y-m-d') . ' ' . fake()->time('H') . ':00:00')));
                    $penB = [
                        'bandara_asal_id' => $j,
                        'bandara_tujuan_id' => $i,
                        'waktu_berangkat' => $baseB,
                        'waktu_sampai' => date('Y-m-d H:i:s', strtotime('+' . rand(2, 4) . ' hours', strtotime($baseB))),
                        'maskapai' => $maskapai[rand(0, 3)],
                        'tipe_pesawat' => $tipe_pesawat[rand(0, 2)],
                    ];
                    array_push($penerbangan, $penB);
                }
            }
        }

        foreach ($penerbangan as $d) {
            Penerbangan::create($d);
        }
    }
}
