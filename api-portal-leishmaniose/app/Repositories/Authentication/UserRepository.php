<?php

declare(strict_types=1);

namespace App\Repositories\Authentication;

use App\Models\User;
use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    protected function setModel(): \Illuminate\Database\Eloquent\Model
    {
        $this->entity = new User();
        return $this->entity;
    }

    /**
     * Find user by email.
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return $this->entity->where('email', $email)->first();
    }
}
