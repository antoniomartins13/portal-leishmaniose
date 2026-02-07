<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Lista todos os usuários (admin only)
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorizePermission('users.view');

        try {
            $users = $this->userService->getAllUsers(
                search: $request->get('search'),
                role: $request->get('role'),
                page: $request->get('page', 1),
                perPage: $request->get('per_page', 15)
            );

            return $this->sendResponse($users, 'Usuários listados com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Exibe um usuário específico
     */
    public function show(User $user): JsonResponse
    {
        $this->authorizePermission('users.view');

        return $this->sendResponse($user, 'Usuário recuperado com sucesso');
    }

    /**
     * Cria um novo usuário (admin only)
     */
    public function store(UserStoreRequest $request): JsonResponse
    {
        $this->authorizePermission('users.create');

        try {
            $user = $this->userService->createUser($request->validated());
            return $this->sendResponse($user, 'Usuário criado com sucesso', 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Atualiza um usuário existente (admin only)
     */
    public function update(UserUpdateRequest $request, User $user): JsonResponse
    {
        $this->authorizePermission('users.edit');

        try {
            $updatedUser = $this->userService->updateUser($user, $request->validated());
            return $this->sendResponse($updatedUser, 'Usuário atualizado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }

    /**
     * Deleta um usuário (admin only)
     */
    public function destroy(User $user): JsonResponse
    {
        $this->authorizePermission('users.delete');

        try {
            $this->userService->deleteUser($user);
            return $this->sendResponse(null, 'Usuário deletado com sucesso');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 422);
        }
    }
}
