<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Authentication\AuthService;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *   name="Auth",
 *   description="Autenticacao e perfil"
 * )
 */
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
        * @OA\Post(
        *   path="/api/auth/register",
        *   tags={"Auth"},
        *   summary="Registrar usuario",
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/AuthRegisterRequest")
        *   ),
        *   @OA\Response(
        *     response=201,
        *     description="Usuario registrado",
        *     @OA\JsonContent(ref="#/components/schemas/AuthRegisterResponse")
        *   ),
        *   @OA\Response(
        *     response=400,
        *     description="Falha no registro",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        * @OA\Post(
        *   path="/api/auth/login",
        *   tags={"Auth"},
        *   summary="Login de usuario",
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/AuthLoginRequest")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Login realizado",
        *     @OA\JsonContent(ref="#/components/schemas/AuthLoginResponse")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Credenciais invalidas",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        $user->load('roles', 'permissions');
        
        // Preparar dados do usuário com roles como array de strings
        $userData = $user->toArray();
        $userData['roles'] = $user->roles->pluck('name')->toArray();
        $userData['permissions'] = $user->getAllPermissions()->pluck('name')->toArray();
        
        $token = $this->authService->createToken($user);

        return $this->sendResponse([
            'user' => $userData,
            'token' => $token,
        ], 'Login successful', 200);
    }

    /**
     * Logout user (revoke current token).
     *
        * @OA\Post(
        *   path="/api/auth/logout",
        *   tags={"Auth"},
        *   summary="Logout do usuario",
        *   security={{"bearerAuth":{}}},
        *   @OA\Response(
        *     response=200,
        *     description="Logout realizado",
        *     @OA\JsonContent(type="object")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        * @OA\Get(
        *   path="/api/auth/profile",
        *   tags={"Auth"},
        *   summary="Perfil do usuario autenticado",
        *   security={{"bearerAuth":{}}},
        *   @OA\Response(
        *     response=200,
        *     description="Perfil recuperado",
        *     @OA\JsonContent(ref="#/components/schemas/AuthProfileResponse")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        * @OA\Post(
        *   path="/api/auth/logout-all",
        *   tags={"Auth"},
        *   summary="Logout de todos os dispositivos",
        *   security={{"bearerAuth":{}}},
        *   @OA\Response(
        *     response=200,
        *     description="Logout total realizado",
        *     @OA\JsonContent(type="object")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
