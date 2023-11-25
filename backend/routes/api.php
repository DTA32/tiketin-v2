<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BandaraController;
use App\Http\Controllers\PenerbanganController;
use App\Http\Controllers\KelasPenerbanganController;
use App\Http\Controllers\PemesananController;
use App\Http\Controllers\UserController;

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
Route::get('/news/getAll', [NewsController::class, 'getAll']);
Route::get('/news/get/{id}', [NewsController::class, 'getDetail']);
Route::get('/bandara/getKota', [BandaraController::class, 'getKota']);
Route::post('/penerbangan/search', [PenerbanganController::class, 'search']);
Route::get('/kelasPenerbangan/getDetail/{id}', [KelasPenerbanganController::class, 'getDetail']);
Route::post('/pemesanan/create', [PemesananController::class, 'create']);
Route::get('/pemesanan/getDetail/{id}', [PemesananController::class, 'getDetail']);
Route::put('/pemesanan/pay/{id}', [PemesananController::class, 'pay']);
Route::get('/pemesanan/getAll', [PemesananController::class, 'getAll']);


Route::prefix('admin')->group(function () {
    Route::get('/news/getAll', [NewsController::class, 'getAll']);
    // Route::get('/news/get/{id}', [NewsController::class, 'getDetail']);
    // Route::post('/news/create', [NewsController::class, 'create']);
    // Route::put('/news/update/{id}', [NewsController::class, 'update']);
    // Route::delete('/news/delete/{id}', [NewsController::class, 'delete']);
    Route::get('/bandara/getAll', [BandaraController::class, 'getAll']);
    // Route::post('/bandara/create', [BandaraController::class, 'create']);
    // Route::put('/bandara/update/{id}', [BandaraController::class, 'update']);
    // Route::delete('/bandara/delete/{id}', [BandaraController::class, 'delete']);
    // Route::get('/pemesanan/getAll', [PemesananController::class, 'getAll']);
    // Route::get('/pemesanan/get/{id}', [PemesananController::class, 'getDetail']);
    Route::get('/penerbangan/getAll', [PenerbanganController::class, 'getAll']);
    // Route::get('/penerbangan/get/{id}', [PenerbanganController::class, 'getDetail']);
    // Route::post('/penerbangan/create', [PenerbanganController::class, 'create']);
    // Route::put('/penerbangan/update/{id}', [PenerbanganController::class, 'update']);
    // Route::delete('/penerbangan/delete/{id}', [PenerbanganController::class, 'delete']);
    Route::get('/kelasPenerbangan/getByPen/{id}', [KelasPenerbanganController::class, 'getByPen']);
    // Route::get('/kelasPenerbangan/get/{id}', [KelasPenerbanganController::class, 'getDetail']);
    // Route::post('/kelasPenerbangan/create', [KelasPenerbanganController::class, 'create']);
    // Route::put('/kelasPenerbangan/update/{id}', [KelasPenerbanganController::class, 'update']);
    // Route::delete('/kelasPenerbangan/delete/{id}', [KelasPenerbanganController::class, 'delete']);
    Route::get('/user/getAll', [UserController::class, 'getAll']);
});
