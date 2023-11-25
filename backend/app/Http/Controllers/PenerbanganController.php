<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\penerbangan;

class PenerbanganController extends Controller
{
    public function search(Request $request){
        $validator = \Validator::make($request->all(), [
            'dari' => 'required',
            'ke' => 'required',
            'tanggal' => 'required',
            'kelas' => 'required',
            'penumpang' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => '400',
                'data' => []
            ]);
        }
        $dari = $request->input('dari');
        $ke = $request->input('ke');
        $tanggal = $request->input('tanggal');
        $kelas = $request->input('kelas');
        $penumpang = $request->input('penumpang');
        $results = Penerbangan::with([
            'bandara_asal',
            'bandara_tujuan',
            'kelas_penerbangan' => function ($query) use ($kelas, $penumpang) {
                $query->select('id', 'penerbangan_id', 'tipe_kelas', 'harga', 'jumlah_kursi');
                $query->where('tipe_kelas', '=', $kelas);
                $query->where('jumlah_kursi', '>=', $penumpang);
            }
        ])
        ->whereHas('bandara_asal', function ($query) use ($dari) {
            $query->where('kota', '=', $dari);
        })
        ->whereHas('bandara_tujuan', function ($query) use ($ke) {
            $query->where('kota', '=', $ke);
        })
        ->where('waktu_berangkat', 'like', $tanggal . '%')
        ->get();
        if($results->isEmpty()){
            return response()->json([
                'status' => '404',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => '200',
            'data' => $results
        ]);
    }
    public function getAll(){
        $results = Penerbangan::with([
            'bandara_asal',
            'bandara_tujuan',
        ])->get();
        return response()->json($results);
    }
}
