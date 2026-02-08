<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *   name="Usuarios",
 *   description="Gestao de usuarios"
 * )
 */
class UserController extends BaseController
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Lista todos os usuários (admin only)
        *
        * @OA\Get(
        *   path="/api/users",
        *   tags={"Usuarios"},
        *   summary="Listar usuarios",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="search",
        *     in="query",
        *     description="Busca por nome ou email",
        *     required=false,
        *     @OA\Schema(type="string")
        *   ),
        *   @OA\Parameter(
        *     name="role",
        *     in="query",
        *     description="Filtro por grupo",
        *     required=false,
        *     @OA\Schema(type="string")
        *   ),
        *   @OA\Parameter(
        *     name="page",
        *     in="query",
        *     required=false,
        *     @OA\Schema(type="integer", example=1)
        *   ),
        *   @OA\Parameter(
        *     name="per_page",
        *     in="query",
        *     required=false,
        *     @OA\Schema(type="integer", example=15)
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Lista de usuarios",
        *     @OA\JsonContent(ref="#/components/schemas/UserListResponse")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        *
        * @OA\Get(
        *   path="/api/users/{user}",
        *   tags={"Usuarios"},
        *   summary="Detalhar usuario",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="user",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Usuario recuperado",
        *     @OA\JsonContent(ref="#/components/schemas/User")
        *   ),
        *   @OA\Response(
        *     response=401,
        *     description="Nao autenticado",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
     */
    public function show(User $user): JsonResponse
    {
        $this->authorizePermission('users.view');

        return $this->sendResponse($user, 'Usuário recuperado com sucesso');
    }

    /**
     * Cria um novo usuário (admin only)
        *
        * @OA\Post(
        *   path="/api/users",
        *   tags={"Usuarios"},
        *   summary="Criar usuario",
        *   security={{"bearerAuth":{}}},
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/UserCreateRequest")
        *   ),
        *   @OA\Response(
        *     response=201,
        *     description="Usuario criado",
        *     @OA\JsonContent(ref="#/components/schemas/User")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        *
        * @OA\Patch(
        *   path="/api/users/{user}",
        *   tags={"Usuarios"},
        *   summary="Atualizar usuario",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="user",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\RequestBody(
        *     required=true,
        *     @OA\JsonContent(ref="#/components/schemas/UserUpdateRequest")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Usuario atualizado",
        *     @OA\JsonContent(ref="#/components/schemas/User")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha de validacao",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
        *
        * @OA\Delete(
        *   path="/api/users/{user}",
        *   tags={"Usuarios"},
        *   summary="Deletar usuario",
        *   security={{"bearerAuth":{}}},
        *   @OA\Parameter(
        *     name="user",
        *     in="path",
        *     required=true,
        *     @OA\Schema(type="integer")
        *   ),
        *   @OA\Response(
        *     response=200,
        *     description="Usuario removido",
        *     @OA\JsonContent(type="object")
        *   ),
        *   @OA\Response(
        *     response=422,
        *     description="Falha ao remover",
        *     @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
        *   )
        * )
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
