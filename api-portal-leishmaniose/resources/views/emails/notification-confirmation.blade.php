<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Notificação</title>
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

        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
        }

        .details-table td {
            padding: 8px 0;
            font-size: 14px;
            border-bottom: 1px solid #f3f4f6;
        }

        .details-table td:first-child {
            font-weight: 600;
            color: #6b7280;
            width: 140px;
        }

        .footer {
            background-color: #f9fafb;
            padding: 20px 32px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            border-top: 1px solid #f3f4f6;
        }

        .footer p {
            margin: 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="card">
            <!-- Header -->
            <div class="header">
                <h1>Portal Leishmaniose</h1>
            </div>

            <!-- Body -->
            <div class="body">
                <p>Olá, <strong>{{ $notification->name }}</strong>!</p>

                <p>
                    Sua notificação de caso suspeito de Leishmaniose foi registrada com sucesso
                    em nosso sistema. Abaixo estão os detalhes do registro:
                </p>

                <!-- Protocolo -->
                <div class="protocol-box">
                    <p class="label">Número de Protocolo</p>
                    <p class="value">{{ $notification->protocol }}</p>
                </div>

                <!-- Detalhes -->
                <table class="details-table">
                    <tr>
                        <td>Nome</td>
                        <td>{{ $notification->name }}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>{{ $notification->email }}</td>
                    </tr>
                    <tr>
                        <td>Cidade</td>
                        <td>{{ $notification->city }} - {{ $notification->state }}</td>
                    </tr>
                    <tr>
                        <td>Data dos sintomas</td>
                        <td>{{ \Carbon\Carbon::parse($notification->symptoms_date)->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{{ $notification->status_label }}</td>
                    </tr>
                </table>

                <p>
                    Guarde o número de protocolo para acompanhamento futuro.
                    Nossa equipe analisará os dados e poderá entrar em contato caso necessário.
                </p>

                <p>
                    Agradecemos sua contribuição para o monitoramento e combate à Leishmaniose.
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>Este é um e-mail automático. Por favor, não responda.</p>
                <p>&copy; {{ date('Y') }} Portal Leishmaniose</p>
            </div>
        </div>
    </div>
</body>

</html>
