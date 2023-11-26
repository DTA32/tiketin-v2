<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Support;

class SupportController extends Controller
{
    public function post(Request $request){
        $request->validate([
            'subject' => 'required',
            'message' => 'required',
        ]);
        $support = Support::create([
            'order_id' => $request->order_id,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);
        return response()->json([
            'status' => 200,
        ]);
    }
}
