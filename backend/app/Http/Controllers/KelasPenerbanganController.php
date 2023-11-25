<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\kelas_penerbangan;

class KelasPenerbanganController extends Controller
{
    public function getDetail($id){
        $result = kelas_penerbangan::with([
            'penerbangan',
            'penerbangan.bandara_asal',
            'penerbangan.bandara_tujuan'
        ])
        ->find($id);
        if($result == null){
            return response()->json([
                'status' => '404',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => '200',
            'data' => $result
        ]);
    }
    public function getByPen($id){
        $results = kelas_penerbangan::where('penerbangan_id', '=', $id)->get();
        return response()->json($results);
    }
}
