<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BandaraController;
use App\Http\Controllers\PenerbanganController;
use App\Http\Controllers\KelasPenerbanganController;
use App\Http\Controllers\PemesananController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/news/highlight', [NewsController::class, 'index']);
Route::get('/bandara/getKota', [BandaraController::class, 'getKota']);
Route::post('/penerbangan/search', [PenerbanganController::class, 'search']);
Route::get('/kelasPenerbangan/getDetail/{id}', [KelasPenerbanganController::class, 'getDetail']);
Route::post('/pemesanan/create', [PemesananController::class, 'create']);
Route::get('/pemesanan/getDetail/{id}', [PemesananController::class, 'getDetail']);
Route::put('/pemesanan/pay/{id}', [PemesananController::class, 'pay']);
