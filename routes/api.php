<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('signup', 'Api\AuthController@signup')->name('signup');
Route::post('signup', [AuthController::class, 'signup'])->name('test');

Route::post('login', 'Api\AuthController@login')->name('login');
Route::post('logout', 'Api\AuthController@logout')->name('logout');
Route::get('signup', [AuthController::class, 'signup_get'])->name('test');
