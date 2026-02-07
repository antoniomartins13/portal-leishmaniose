<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Symptom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Scope para buscar apenas sintomas ativos
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Relacionamento com notificações
     */
    public function notifications(): BelongsToMany
    {
        return $this->belongsToMany(Notification::class, 'notification_symptom')
            ->withTimestamps();
    }
}
