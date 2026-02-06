<?php

declare(strict_types=1);

namespace App\Services\Authentication;

use App\Models\User;
use App\Repositories\BaseRepository;
use App\Services\BaseService;
use Illuminate\Database\Eloquent\Model;

class LogService extends BaseService
{
    protected function setRepository(): BaseRepository
    {
        // LogService não usa repository, retorna uma instância vazia
        return new DummyRepository();
    }

    /**
     * Create a log entry for user actions.
     *
     * @param User $user
     * @param string $action
     * @param string $controller
     * @return void
     */
    public function createLog(User $user, string $action, string $controller): void
    {
        // TODO: Implement log persistence if needed in the future
        // This is a placeholder for logging user actions
    }
}

class DummyRepository extends BaseRepository
{
    protected function setModel(): Model
    {
        // Return a dummy user model for compatibility
        return new User();
    }
}
