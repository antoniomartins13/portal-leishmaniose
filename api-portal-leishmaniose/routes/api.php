<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\SymptomController;
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

// Public notification route (anyone can submit)
Route::post('notifications', [NotificationController::class, 'store'])->name('notifications.store');

// Public symptoms list (for notification form)
Route::get('symptoms', [SymptomController::class, 'index'])->name('symptoms.index');

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication routes
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::post('logout-all', [AuthController::class, 'logoutAll'])->name('auth.logoutAll');
        Route::get('profile', [AuthController::class, 'profile'])->name('auth.profile');
    });

    // User management routes (admin only)
    Route::apiResource('users', UserController::class);

    // Role management routes (admin only)
    Route::apiResource('roles', RoleController::class)->only(['index', 'store', 'destroy', 'show', 'update']);

    // Permissions list for role management
    Route::get('permissions', [\App\Http\Controllers\API\PermissionController::class, 'index']);

    // Symptom management routes (admin only)
    Route::get('symptoms/all', [SymptomController::class, 'adminIndex'])->name('symptoms.adminIndex');
    Route::apiResource('symptoms', SymptomController::class)->except(['index']);

    // User info endpoint
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
