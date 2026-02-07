<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Relatório de Casos Confirmados — Portal da Leishmaniose</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 11px;
            color: #1a1a1a;
        }

        .header {
            background-color: #0f766e;
            color: #ffffff;
            padding: 20px 30px;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 20px;
            margin-bottom: 4px;
        }

        .header p {
            font-size: 11px;
            opacity: 0.85;
        }

        .meta {
            padding: 0 30px;
            margin-bottom: 16px;
            font-size: 10px;
            color: #555;
        }

        .meta span {
            margin-right: 20px;
        }

        .filters-box {
            margin: 0 30px 16px;
            padding: 10px 14px;
            background: #f0fdfa;
            border: 1px solid #99f6e4;
            border-radius: 4px;
            font-size: 10px;
            color: #0f766e;
        }

        .filters-box strong {
            display: block;
            margin-bottom: 4px;
            font-size: 11px;
        }

        table {
            width: calc(100% - 60px);
            margin: 0 30px;
            border-collapse: collapse;
            font-size: 10px;
        }

        thead th {
            background-color: #f3f4f6;
            border-bottom: 2px solid #d1d5db;
            padding: 8px 6px;
            text-align: left;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 9px;
            color: #374151;
            letter-spacing: 0.5px;
        }

        tbody td {
            padding: 7px 6px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
        }

        tbody tr:nth-child(even) {
            background: #f9fafb;
        }

        .protocol {
            font-family: monospace;
            font-weight: 700;
            color: #0f766e;
        }

        .symptom-chip {
            display: inline-block;
            background: #ccfbf1;
            color: #115e59;
            padding: 1px 6px;
            border-radius: 8px;
            font-size: 9px;
            margin: 1px 2px 1px 0;
        }

        .footer {
            margin-top: 24px;
            padding: 12px 30px;
            border-top: 1px solid #e5e7eb;
            font-size: 9px;
            color: #9ca3af;
            text-align: center;
        }

        .summary {
            margin: 0 30px 16px;
            padding: 10px 14px;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 4px;
        }

        .summary strong {
            color: #15803d;
            font-size: 13px;
        }

        .summary span {
            font-size: 10px;
            color: #555;
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>Relatório de Casos Confirmados</h1>
        <p>Portal da Leishmaniose — {{ $generatedAt }}</p>
    </div>

    <div class="meta">
        <span>Total de registros: <strong>{{ $total }}</strong></span>
        <span>Gerado em: {{ $generatedAt }}</span>
    </div>

    @if (!empty($activeFilters))
        <div class="filters-box">
            <strong>Filtros aplicados:</strong>
            {{ implode(' | ', $activeFilters) }}
        </div>
    @endif

    <table>
        <thead>
            <tr>
                <th>Protocolo</th>
                <th>Nome</th>
                <th>Cidade / UF</th>
                <th>Bairro</th>
                <th>Data Sintomas</th>
                <th>Sintomas</th>
                <th>Data Notificação</th>
            </tr>
        </thead>
        <tbody>
            @forelse($notifications as $n)
                <tr>
                    <td class="protocol">{{ $n->protocol }}</td>
                    <td>{{ $n->name ?? 'Não informado' }}</td>
                    <td>{{ $n->city }} / {{ $n->state }}</td>
                    <td>{{ $n->neighborhood ?? '—' }}</td>
                    <td>{{ $n->symptoms_date ? $n->symptoms_date->format('d/m/Y') : '—' }}</td>
                    <td>
                        @forelse($n->symptoms as $symptom)
                            <span class="symptom-chip">{{ $symptom->name }}</span>
                        @empty
                            —
                        @endforelse
                    </td>
                    <td>{{ $n->created_at->format('d/m/Y') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px; color: #9ca3af;">
                        Nenhum caso confirmado encontrado com os filtros aplicados.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Portal da Leishmaniose &mdash; Relatório gerado automaticamente em {{ $generatedAt }}
    </div>

</body>

</html>
