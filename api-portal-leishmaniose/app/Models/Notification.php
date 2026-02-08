<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'protocol',
        'name',
        'cpf',
        'email',
        'cep',
        'state',
        'city',
        'neighborhood',
        'symptoms_date',
        'details',
        'status',
        'user_id',
    ];

    protected $casts = [
        'symptoms_date' => 'date',
    ];

    /**
     * Gera um protocolo único para a notificação.
     * Busca o maior número sequencial já utilizado no ano (incluindo soft-deleted)
     * para evitar colisões com registros cujo created_at difere do ano do protocolo.
     */
    public static function generateProtocol(): string
    {
        $year = date('Y');
        $prefix = "LEI-{$year}-";

        $maxNumber = (int) self::withTrashed()
            ->where('protocol', 'like', "{$prefix}%")
            ->selectRaw("MAX(CAST(REPLACE(protocol, ?, '') AS INTEGER)) as max_num", [$prefix])
            ->value('max_num');

        return sprintf('LEI-%s-%05d', $year, $maxNumber + 1);
    }

    /**
     * Relacionamento com usuário (opcional)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relacionamento com sintomas
     */
    public function symptoms(): BelongsToMany
    {
        return $this->belongsToMany(Symptom::class, 'notification_symptom')
            ->withTimestamps();
    }

    /**
     * Accessor para status traduzido
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pendente',
            'in_analysis' => 'Em Análise',
            'confirmed' => 'Confirmado',
            'discarded' => 'Descartado',
            default => $this->status,
        };
    }
}
