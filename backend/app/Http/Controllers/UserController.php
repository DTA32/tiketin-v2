<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAll(){
        // $users = User::all(); return only id, name, email, role
        $users = User::select('id', 'name', 'email', 'role')->get();
        return response()->json($users);
    }
}
