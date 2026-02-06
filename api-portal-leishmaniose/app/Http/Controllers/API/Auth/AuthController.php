<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Authentication\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends BaseController
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->register($request->validated());

            return $this->sendResponse([
                'user' => $user,
                'token' => $this->authService->createToken($user),
            ], 'User registered successfully', 201);
        } catch (\Exception $e) {
            return $this->sendError('Registration failed', [$e->getMessage()], 400);
        }
    }

    /**
     * Login user.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (!$this->authService->authenticate($credentials['email'], $credentials['password'])) {
            return $this->sendError('Invalid credentials', ['The provided credentials are incorrect.'], 401);
        }

        $user = $this->authService->getUserByEmail($credentials['email']);
        $token = $this->authService->createToken($user);

        return $this->sendResponse([
            'user' => $user,
            'token' => $token,
        ], 'Login successful', 200);
    }

    /**
     * Logout user (revoke current token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $user = $this->takeUser();

        if (!$user) {
            return $this->sendError('Unauthorized', ['User not authenticated.'], 401);
        }

        // Revoke the current token
        $user->currentAccessToken()->delete();

        return $this->sendResponse([], 'Logout successful', 200);
    }

    /**
     * Get authenticated user profile.
     *
     * @return JsonResponse
     */
    public function profile(): JsonResponse
    {
        $user = $this->takeUser();

        if (!$user) {
            return $this->sendError('Unauthorized', ['User not authenticated.'], 401);
        }

        return $this->sendResponse([
            'user' => $user,
        ], 'User profile retrieved', 200);
    }

    /**
     * Logout from all devices (revoke all tokens).
     *
     * @return JsonResponse
     */
    public function logoutAll(): JsonResponse
    {
        $user = $this->takeUser();

        if (!$user) {
            return $this->sendError('Unauthorized', ['User not authenticated.'], 401);
        }

        $this->authService->revokeAllTokens($user);

        return $this->sendResponse([], 'Logged out from all devices', 200);
    }
}
