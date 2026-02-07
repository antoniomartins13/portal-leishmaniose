<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        parent::__construct();
    }

    protected function setRepository(): UserRepository
    {
        return $this->userRepository;
    }

    /**
     * Obtém todos os usuários com paginação
     */
    public function getAllUsers(
        ?string $search = null,
        ?string $role = null,
        int $page = 1,
        int $perPage = 15
    ): LengthAwarePaginator {
        return $this->userRepository->getAllPaginated(
            page: $page,
            perPage: $perPage,
            search: $search,
            filters: $role ? ['role' => $role] : []
        );
    }

    /**
     * Cria um novo usuário
     */
    public function createUser(array $data): User
    {
        // Hash da senha
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = $this->userRepository->create($data);

        // Atribuir role se fornecido
        if (isset($data['role'])) {
            $user->assignRole($data['role']);
        }

        return $user;
    }

    /**
     * Atualiza um usuário existente
     */
    public function updateUser(User $user, array $data): User
    {
        // Hash da senha se fornecido
        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $updatedUser = $this->userRepository->update($user->id, $data);

        // Sincronizar roles se fornecido
        if (isset($data['role'])) {
            $updatedUser->syncRoles($data['role']);
        }

        return $updatedUser;
    }

    /**
     * Deleta um usuário
     */
    public function deleteUser(User $user): bool
    {
        return $this->userRepository->delete($user->id);
    }
}
