<?php

declare(strict_types=1);

namespace App\Services\Authentication;

use App\Models\User;
use App\Repositories\Authentication\UserRepository;
use App\Repositories\BaseRepository;
use App\Services\BaseService;
use Illuminate\Support\Facades\Hash;

class AuthService extends BaseService
{
    private UserRepository $userRepository;

    public function __construct()
    {
        parent::__construct();
        $this->userRepository = new UserRepository();
    }

    protected function setRepository(): BaseRepository
    {
        return new UserRepository();
    }

    /**
     * Register a new user.
     *
     * @param array $data
     * @return User
     */
    public function register(array $data): User
    {
        return $this->userRepository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Authenticate user with email and password.
     *
     * @param string $email
     * @param string $password
     * @return bool
     */
    public function authenticate(string $email, string $password): bool
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user || !Hash::check($password, $user->password)) {
            return false;
        }

        return true;
    }

    /**
     * Get user by email.
     *
     * @param string $email
     * @return User|null
     */
    public function getUserByEmail(string $email): ?User
    {
        return $this->userRepository->findByEmail($email);
    }

    /**
     * Create API token for user.
     *
     * @param User $user
     * @param string $tokenName
     * @return string
     */
    public function createToken(User $user, string $tokenName = 'api-token'): string
    {
        return $user->createToken($tokenName)->plainTextToken;
    }

    /**
     * Revoke all user tokens.
     *
     * @param User $user
     * @return bool
     */
    public function revokeAllTokens(User $user): bool
    {
        $user->tokens()->delete();
        return true;
    }
}
