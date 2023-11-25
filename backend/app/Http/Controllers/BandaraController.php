<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bandara;

class BandaraController extends Controller
{
    public function getKota(){
        $town = Bandara::select('kota')->distinct()->get();
        return response()->json($town);
    }
    public function getAll(){
        $bandara = Bandara::all();
        return response()->json($bandara);
    }
}
