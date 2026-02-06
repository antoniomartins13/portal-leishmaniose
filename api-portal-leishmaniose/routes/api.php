<?php

use App\Http\Controllers\API\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Public authentication routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication routes
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::post('logout-all', [AuthController::class, 'logoutAll'])->name('auth.logoutAll');
        Route::get('profile', [AuthController::class, 'profile'])->name('auth.profile');
    });

    // User info endpoint
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
