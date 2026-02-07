<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    protected function setModel(): User
    {
        return $this->entity = new User();
    }

    /**
     * Obtém usuários com paginação e filtros
     */
    public function getAllPaginated(
        int $page = 1,
        int $perPage = 15,
        ?string $search = null,
        array $filters = []
    ) {
        $query = $this->entity->query()->with('roles')->withTrashed();

        // Busca por nome ou email
        if ($search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%");
        }

        // Filtrar por role se fornecido
        if (isset($filters['role'])) {
            $query->role($filters['role']);
        }

        // Ordenar por mais recente
        $query->orderBy('created_at', 'desc');

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Encontra usuário por email
     */
    public function findByEmail(string $email): ?User
    {
        return $this->entity->where('email', $email)->first();
    }
}
