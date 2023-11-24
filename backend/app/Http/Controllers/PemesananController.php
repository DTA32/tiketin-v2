<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pemesanan;
use App\Models\pemesanan_penumpang;
use App\Models\pemesanan_harga;
use App\Models\kelas_penerbangan;
use Illuminate\Support\Str;

class PemesananController extends Controller
{
    public function create(Request $request){
        $validator = \Validator::make($request->all(), [
            'kelas_id' => 'required',
            'penumpang' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => '400',
                'data' => []
            ]);
        }
        $kelas_penerbangan = kelas_penerbangan::where('id', $request->input('kelas_id'))->first();
        $pemesanan = pemesanan::create([
            'penerbangan_id' => $kelas_penerbangan->penerbangan_id,
            'status' => 0,
            'metode_pembayaran' => 0,
            'referensi_pembayaran' => '0',
            'kelas_penerbangan_id' => $kelas_penerbangan->id,
            'userId' => 1, // not binded to user yet until auth is implemented
            'booking_code' => strtoupper(Str::random(8))
        ]);
        $pemesanan->save();

        $passengers = $request->input('penumpang');
        foreach ($passengers as $passenger) {
            $newPassenger['pemesanan_id'] = $pemesanan->id;
            $newPassenger['nama'] = $passenger['nama'];
            $newPassenger['kursi_penerbangan'] = $passenger['kursi_penerbangan'];
            $pemesanan_penumpang = pemesanan_penumpang::create($newPassenger);
            $pemesanan_penumpang->save();
        }

        $pemesanan_harga = pemesanan_harga::create([
            'pemesanan_id' => $pemesanan->id,
            'biaya_dasar' => $kelas_penerbangan->harga,
            'kuantitas' => count($passengers),
            'biaya_layanan' => 10000,
            'total' => $kelas_penerbangan->harga * count($passengers) + 10000
        ]);
        $pemesanan_harga->save();

        $kelas_penerbangan->jumlah_kursi = $kelas_penerbangan->jumlah_kursi - count($passengers);

        $seatLayout = json_decode($kelas_penerbangan->seat_layout, true);
        foreach($passengers as $penumpang){
            $arr = str_split($penumpang['kursi_penerbangan']);
            $row = 0;
            $col = 0;
            // $key = 0;
            // if(sizeof($arr) == 3){
            //     $row = $arr[0].$arr[1];
            //     $key = 2;
            // }
            // else{
            //     $row = $arr[0];
            //     $key = 1;
            // }
            // if($arr[$key] == 'A'){
            //     $col = 0;
            // }
            // else if ($arr[$key] == 'B'){
            //     $col = 1;
            // }
            // else if ($arr[$key] == 'C'){
            //     $col = 2;
            // }
            // else if ($arr[$key] == 'D'){
            //     $col = 3;
            // }
            // else if ($arr[$key] == 'E'){
            //     $col = 4;
            // }
            // else if ($arr[$key] == 'F'){
            //     $col = 5;
            // }
            $row = (sizeof($arr) > 2 ? $arr[0].$arr[1] : $arr[0]) - $seatLayout['rows'][0]['row_number'];
            $col = mb_ord($arr[sizeof($arr)-1]) - mb_ord('A');
            $seatLayout['rows'][$row]['seats'][$col]['available'] = false;
        }

        $kelas_penerbangan->seat_layout = json_encode($seatLayout, JSON_PRETTY_PRINT);
        $kelas_penerbangan->save();

        return response()->json([
            'status' => '200',
            'data' => ['id' => $pemesanan->id]
        ]);
    }
    public function getDetail($id){
        $pemesanan = pemesanan::with([
            'penerbangan',
            'penerbangan.bandara_asal',
            'penerbangan.bandara_tujuan',
            'pemesanan_harga',
            'pemesanan_penumpang',
            'kelas_penerbangan' => function ($query) {
                $query->select('id', 'penerbangan_id', 'tipe_kelas', 'harga', 'jumlah_kursi');
            }
        ])
        ->where('id', $id)
        ->first();
        if($pemesanan == null){
            return response()->json([
                'status' => '404',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => '200',
            'data' => $pemesanan
        ]);
    }
    public function pay(Request $request){
        $validator = \Validator::make($request->all(), [
            'id' => 'required',
            'metode_pembayaran' => 'required',
            'referensi_pembayaran' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => '400',
                'data' => []
            ]);
        }
        $pemesanan = pemesanan::where('id', $request->input('id'))->first();
        if($pemesanan == null){
            return response()->json([
                'status' => '404',
                'data' => []
            ]);
        }
        $pemesanan->update([
            'status' => 1,
            'metode_pembayaran' => $request->input('metode_pembayaran'),
            'referensi_pembayaran' => $request->input('referensi_pembayaran')
        ]);
        $pemesanan->save();
        return response()->json([
            'status' => '200',
            'data' => []
        ]);
    }
}
