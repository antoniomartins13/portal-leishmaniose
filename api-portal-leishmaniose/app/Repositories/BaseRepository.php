<?php

declare(strict_types=1);

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Laravel\Scout\Builder as ScoutBuilder;

abstract class BaseRepository
{
    protected Model $entity;

    public function __construct()
    {
        $this->setModel();
    }

    public function database()
    {
        return DB::table($this->entity->getTable());
    }

    public function active(int $id)
    {
        return $this->entity->onlyTrashed()->findOrFail($id)->restore();
    }

    public function all(): ?Collection
    {
        return $this->entity->all();
    }

    /**
     *  A function to return the data paginated
     *  Make the pagination and the query params to order and search.
     *  Its necessary model have the trait Searchable
     * @return LengthAwarePaginator
     */
    public function allPaginated(): ?LengthAwarePaginator
    {
        $search = request()->query('search_all_fields_string');
        $sortColumn = request()->query('sort_by');
        $sortDirection = request()->query('sort_direction');

        if ($search) {
            if ($sortColumn && $sortDirection) {
                return $this->entity->search($search)->orderBy($sortColumn, $sortDirection)->paginate(10);
            }
            return $this->entity->search($search)->paginate(10);
        }
        $query = $this->entity->newQuery();

        if ($sortColumn && $sortDirection) {
            $query->orderBy($sortColumn, $sortDirection);
        }

        return $query->paginate(10);
    }

    /**
     * Performs full-text search in a model, with an existing query (ideal for filtering).
     *
     * Obs: needs to have query search 'search_all_fields_string' and the model have to be previously configured.
     * @param \Illuminate\Database\Eloquent\Builder The query without search in all columns.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    //    public function fullTextSearchPaginatedWithAdditionalQuery(Builder $query): LengthAwarePaginator|null
    //    {
    //        $search = request()->query('search_all_fields_string');
    //
    //        if ($search) {
    //            return $this->entity->search($search, $query)->paginate(10);
    //        }
    //    }

    public function allWithTrashed(): ?Collection
    {
        return $this->entity->withTrashed()->get();
    }

    /**
     *  A function to return the data with trashed paginated
     *  Make the pagination and the query params to order and search.
     *  Its necessary model have the trait Searchable
     * @return LengthAwarePaginator
     */
    public function allWithTrashedPaginated(): ?LengthAwarePaginator
    {
        $search = request()->query('search_all_fields_string');
        $sortColumn = request()->query('sort_by');
        $sortDirection = request()->query('sort_direction');

        $query = $this->entity->query();

        if ($search) {
            $query = $this->entity->search($search, function ($query) {
                $query->withTrashed();
            });
        }

        if ($sortColumn && $sortDirection) {
            $query->orderBy($sortColumn, $sortDirection);
        }

        return $query->withTrashed()->paginate(10);
    }

    public function find($id): ?Model
    {
        return $this->entity->query()->findOrFail($id);
    }

    public function findWhere($column, $operator = null, $value = null): ?Collection
    {
        return $this->entity->query()->where($column, $operator, $value)->get();
    }

    public function findWherePaginated($column, $operator = null, $value = null): ?LengthAwarePaginator
    {
        return $this->entity->query()->where($column, $operator, $value)->paginate(10);
    }

    public function create(array $attributes): Model
    {
        return $this->entity->query()->create($attributes);
    }

    public function update($id, array $attributes = []): bool
    {
        return $this->entity->query()->findOrFail($id)->update($attributes);
    }

    public function paginate($perPage = null, $columns = ['*'], $page = null): LengthAwarePaginator
    {
        return $this->entity->query()->paginate($perPage, $columns, 'page', $page);
    }

    public function delete($id): bool
    {
        return $this->entity->query()->findOrFail($id)->delete();
    }

    public function deletePermanently(int $id): bool
    {
        return $this->entity->query()->findOrFail($id)->forceDelete();
    }

    public function query(): EloquentBuilder
    {
        return $this->entity->query();
    }

    public function getMostRecentUpdated()
    {
        return $this->entity
            ->select('updated_at')
            ->orderBy('updated_at', 'desc')
            ->limit(1)
            ->get();
    }

    public function filterByDate(Builder $query, $startDate, $endDate): Builder
    {
        if ($startDate !== null && $endDate !== null) {

            $query->where(function ($query) use ($startDate, $endDate) {
                if ($startDate > $endDate) {
                    $query->whereBetween('start_date', [$endDate, $startDate])
                        ->orWhereBetween('end_date', [$endDate, $startDate]);
                } else {
                    $query->whereBetween('start_date', [$startDate, $endDate])
                        ->orWhereBetween('end_date', [$startDate, $endDate]);
                }
            });
        } else if ($startDate !== null) {

            $query->whereDate('start_date', $startDate);
        } else if ($endDate !== null) {

            $query->whereDate('end_date', $endDate);
        }

        return $query;
    }

    abstract protected function setModel(): Model;
}
