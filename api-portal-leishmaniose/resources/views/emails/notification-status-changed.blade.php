<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atualização de Status</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #374151;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 24px;
        }

        .card {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #0f766e;
            padding: 24px 32px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            font-size: 22px;
            margin: 0;
        }

        .body {
            padding: 32px;
        }

        .body p {
            font-size: 15px;
            line-height: 1.6;
            margin: 0 0 16px;
        }

        .protocol-box {
            background-color: #f0fdfa;
            border: 1px solid #99f6e4;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            margin: 24px 0;
        }

        .protocol-box .label {
            font-size: 13px;
            color: #6b7280;
            margin: 0 0 4px;
        }

        .protocol-box .value {
            font-size: 22px;
            font-weight: 700;
            color: #0f766e;
            margin: 0;
        }

        .status-change {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin: 24px 0;
            text-align: center;
        }

        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }

        .status-old {
            background-color: #f3f4f6;
            color: #6b7280;
            text-decoration: line-through;
        }

        .status-new {
            background-color: #f0fdfa;
            color: #0f766e;
            border: 2px solid #0f766e;
        }

        .arrow {
            font-size: 20px;
            color: #9ca3af;
        }

        .info-box {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }

        .info-box p {
            font-size: 14px;
            color: #1e40af;
            margin: 0;
        }

        .footer {
            padding: 20px 32px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            font-size: 12px;
            color: #9ca3af;
            margin: 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="card">
            <!-- Header -->
            <div class="header">
                <h1>Atualização de Status</h1>
            </div>

            <!-- Body -->
            <div class="body">
                <p>Olá{{ $notification->name ? ', ' . $notification->name : '' }}!</p>

                <p>O status da sua notificação foi atualizado no <strong>Portal da Leishmaniose</strong>.</p>

                <!-- Protocolo -->
                <div class="protocol-box">
                    <p class="label">Protocolo</p>
                    <p class="value">{{ $notification->protocol }}</p>
                </div>

                <!-- Status Change -->
                <div style="text-align: center; margin: 24px 0;">
                    <span class="status-badge status-old">{{ $oldStatusLabel }}</span>
                    <span class="arrow">&rarr;</span>
                    <span class="status-badge status-new">{{ $newStatusLabel }}</span>
                </div>

                @if ($notification->status === 'confirmed')
                    <div class="info-box">
                        <p><strong>Caso confirmado.</strong> A equipe de saúde entrará em contato para orientações e
                            acompanhamento.</p>
                    </div>
                @elseif($notification->status === 'in_analysis')
                    <div class="info-box">
                        <p><strong>Em análise.</strong> Sua notificação está sendo avaliada pela equipe de saúde. Você
                            será informado(a) sobre o resultado.</p>
                    </div>
                @elseif($notification->status === 'discarded')
                    <div class="info-box">
                        <p><strong>Caso descartado.</strong> Após avaliação, o caso não foi classificado como
                            leishmaniose. Em caso de dúvidas, procure uma unidade de saúde.</p>
                    </div>
                @elseif($notification->status === 'pending')
                    <div class="info-box">
                        <p><strong>Pendente.</strong> Sua notificação voltou ao status pendente e será reavaliada em
                            breve.</p>
                    </div>
                @endif

                <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
                    Se você tiver dúvidas, entre em contato com a equipe de saúde responsável pelo portal.
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>&copy; {{ date('Y') }} Portal da Leishmaniose. Todos os direitos reservados.</p>
            </div>
        </div>
    </div>
</body>

</html>
