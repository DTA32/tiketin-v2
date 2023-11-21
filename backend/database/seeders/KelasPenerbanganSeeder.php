<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\kelas_penerbangan;
use App\Models\penerbangan;
use Illuminate\Support\Facades\Storage;

class KelasPenerbanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penerbangan = Penerbangan::all();
        $kelas_penerbangan = [];
        foreach($penerbangan as $p){
            $basePrice = rand(5,10) * 100000;
            $kelas_penerbangan1 = [
                'penerbangan_id' => $p->id,
                'tipe_kelas' => 1,
                'harga' => $basePrice,
                'jumlah_kursi' => 60,
                'seat_layout' => Storage::disk('local')->get('seatLayout/economy.json'),
            ];
            $kelas_penerbangan2 = [
                'penerbangan_id' => $p->id,
                'tipe_kelas' => 2,
                'harga' => $basePrice + 300000,
                'jumlah_kursi' => 12,
                'seat_layout' => Storage::disk('local')->get('seatLayout/business.json'),
            ];
            $kelas_penerbangan3 = [
                'penerbangan_id' => $p->id,
                'tipe_kelas' => 3,
                'harga' => $basePrice + 500000,
                'jumlah_kursi' => 8,
                'seat_layout' => Storage::disk('local')->get('seatLayout/first.json'),
            ];
            array_push($kelas_penerbangan, $kelas_penerbangan1);
            array_push($kelas_penerbangan, $kelas_penerbangan2);
            array_push($kelas_penerbangan, $kelas_penerbangan3);
        }
        foreach ($kelas_penerbangan as $d) {
            kelas_penerbangan::create($d);
        }
    }
}
