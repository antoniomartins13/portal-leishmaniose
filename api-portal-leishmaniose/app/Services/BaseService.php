<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

abstract class BaseService
{
    protected BaseRepository $repository;

    public function __construct()
    {
        $this->setRepository();
    }

    public function paginate(Collection $collection, $perPage = 10): LengthAwarePaginator
    {
        $total = $collection->count();

        return new LengthAwarePaginator(
            $collection->forPage(LengthAwarePaginator::resolveCurrentPage(), $perPage),
            $total,
            $perPage,
            LengthAwarePaginator::resolveCurrentPage(),
            ['path' => LengthAwarePaginator::resolveCurrentPath()]
        );
    }

    public function create(array $attributes): Model
    {
        return $this->repository->create($attributes);
    }

    public function all(): ?Collection
    {
        return $this->repository->all();
    }
    public function allPaginated(): ?LengthAwarePaginator
    {
        return $this->repository->allPaginated();
    }

    public function allWithTrashed(): ?Collection
    {
        return $this->repository->allWithTrashed();
    }
    public function allWithTrashedPaginated(): ?LengthAwarePaginator
    {
        return $this->repository->allWithTrashedPaginated();
    }

    public function find($id): ?Model
    {
        return $this->repository->find((int) $id);
    }

    public function findWhere($column, $operator = null, $value = null): ?Collection
    {
        return $this->repository->findWhere($column, $operator, $value);
    }

    public function findWherePaginated(string $column, $operator = null, $value = null): ?LengthAwarePaginator
    {
        return $this->repository->findWherePaginated($column, $operator, $value);
    }

    public function update(int $id, array $attributesUpdate): bool
    {
        return $this->repository->update($id, $attributesUpdate);
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function deletePhoto(string $disk, string $file): bool
    {
        if ($file) {
            return Storage::disk($disk)->delete($file);
        }

        return false;
    }

    public function getMostRecentUpdated()
    {
        return $this->repository->getMostRecentUpdated();
    }

    abstract protected function setRepository(): BaseRepository;
}
