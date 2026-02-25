<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BillingController;

// --- Auth ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    // User & Auth
    Route::get('/user/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Logo Generation
    Route::post('/generate-logo', [AIController::class, 'generate']);
    Route::post('/edit-logo', [AIController::class, 'edit']);

    // Project Management
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    Route::post('/projects/{id}/export', [ProjectController::class, 'export']);

    // Billing
    Route::get('/transactions', [BillingController::class, 'history']);
    Route::post('/transactions/create-order', [BillingController::class, 'createOrder']);
});

// --- Public Webhooks ---
// Open endpoint for Bank/Momo webhooks
Route::post('/webhook/vietqr', [BillingController::class, 'webhook']);
