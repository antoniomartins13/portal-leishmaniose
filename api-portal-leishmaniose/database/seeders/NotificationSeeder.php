<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\Symptom;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Seed the application's database with sample notifications.
     */
    public function run(): void
    {
        $symptomIds = Symptom::pluck('id')->toArray();

        if (empty($symptomIds)) {
            $this->command->warn('Nenhum sintoma encontrado. Execute o SymptomSeeder primeiro.');
            return;
        }

        $states = ['SP', 'RJ', 'MG', 'BA', 'CE', 'PA', 'MA', 'PI', 'TO', 'GO'];

        $cities = [
            'SP' => ['São Paulo', 'Campinas', 'Ribeirão Preto', 'Santos'],
            'RJ' => ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Volta Redonda'],
            'MG' => ['Belo Horizonte', 'Uberlândia', 'Montes Claros', 'Governador Valadares'],
            'BA' => ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Ilhéus'],
            'CE' => ['Fortaleza', 'Sobral', 'Juazeiro do Norte', 'Crato'],
            'PA' => ['Belém', 'Santarém', 'Marabá', 'Castanhal'],
            'MA' => ['São Luís', 'Imperatriz', 'Caxias', 'Timon'],
            'PI' => ['Teresina', 'Parnaíba', 'Picos', 'Floriano'],
            'TO' => ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional'],
            'GO' => ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde'],
        ];

        $neighborhoods = [
            'Centro',
            'Jardim América',
            'Vila Nova',
            'Boa Vista',
            'São José',
            'Santa Maria',
            'Liberdade',
            'Cohab',
            'Vila Industrial',
            'Planalto',
            'Alto da Boa Vista',
            'Parque das Flores',
            'Conjunto Habitacional',
            null,
        ];

        $names = [
            'Maria Silva',
            'João Santos',
            'Ana Oliveira',
            'Pedro Souza',
            'Francisca Lima',
            'Carlos Ferreira',
            'Antonia Costa',
            'José Almeida',
            'Raimunda Pereira',
            'Francisco Rodrigues',
            'Maria das Graças Moura',
            'Luiz Fernando Dias',
            'Patrícia Barbosa',
            'Roberto Nascimento',
            'Juliana Martins',
            'Paulo Ricardo Vieira',
            'Fernanda Araújo',
            'Marcos Antonio Cardoso',
            'Luciana Ribeiro',
            'Anderson Gomes',
            'Beatriz Carvalho',
            'Rafael Monteiro',
            'Camila Teixeira',
            'Diego Nunes',
            'Isabela Mendes',
            'Thiago Correia',
            'Amanda Campos',
            'Lucas Pinto',
            'Larissa Rocha',
            'Gustavo Castro',
            null,
            null,
            null,
        ];

        $detailsList = [
            'Paciente relata febre alta há 5 dias com perda de apetite.',
            'Lesões cutâneas no braço esquerdo, apareceram há 2 semanas.',
            'Emagrecimento acentuado nos últimos 3 meses sem causa aparente.',
            'Febre intermitente e aumento abdominal percebido pelo paciente.',
            'Ferida que não cicatriza no rosto há mais de 1 mês.',
            'Paciente com histórico de área endêmica, apresentando palidez e cansaço.',
            'Contato frequente com cães de rua na região.',
            'Morador de área rural com presença de flebotomíneos.',
            'Criança de 5 anos com febre persistente e hepatoesplenomegalia.',
            'Úlcera indolor na perna direita, borda elevada.',
            'Paciente imunossuprimido com quadro sugestivo de leishmaniose visceral.',
            'Sangramento nasal recorrente associado a febre e fraqueza.',
            null,
            null,
        ];

        $statuses = ['pending', 'in_analysis', 'confirmed', 'discarded'];
        $statusWeights = [
            'pending' => 25,
            'in_analysis' => 20,
            'confirmed' => 40,
            'discarded' => 15,
        ];

        $this->command->info('Criando 50 notificações de exemplo...');

        for ($i = 1; $i <= 50; $i++) {
            $state = $states[array_rand($states)];
            $city = $cities[$state][array_rand($cities[$state])];

            // Seleciona status com pesos (mais confirmados para testes)
            $status = $this->weightedRandom($statusWeights);

            // Data dos sintomas entre 6 meses atrás e hoje
            $symptomsDate = now()->subDays(rand(1, 180))->format('Y-m-d');

            // Data de criação da notificação: entre a data dos sintomas e hoje
            $createdAt = fake()->dateTimeBetween($symptomsDate, 'now');

            $notification = Notification::create([
                'protocol' => sprintf('LEI-%s-%05d', date('Y'), $i),
                'name' => $names[array_rand($names)],
                'cpf' => $this->generateCpf(),
                'email' => "paciente{$i}@exemplo.com",
                'cep' => sprintf('%05d-%03d', rand(10000, 99999), rand(0, 999)),
                'state' => $state,
                'city' => $city,
                'neighborhood' => $neighborhoods[array_rand($neighborhoods)],
                'symptoms_date' => $symptomsDate,
                'details' => $detailsList[array_rand($detailsList)],
                'status' => $status,
                'user_id' => null,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            // Associa 1 a 4 sintomas aleatórios
            $randomSymptoms = collect($symptomIds)->random(rand(1, min(4, count($symptomIds))));
            $notification->symptoms()->attach($randomSymptoms);
        }

        $counts = Notification::selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status');
        $this->command->info('Notificações criadas com sucesso!');
        foreach ($counts as $status => $total) {
            $this->command->info("  {$status}: {$total}");
        }
    }

    /**
     * Seleção aleatória com pesos.
     */
    private function weightedRandom(array $weights): string
    {
        $total = array_sum($weights);
        $rand = rand(1, $total);
        $current = 0;

        foreach ($weights as $key => $weight) {
            $current += $weight;
            if ($rand <= $current) {
                return $key;
            }
        }

        return array_key_first($weights);
    }

    /**
     * Gera um CPF formatado (apenas números válidos em formato).
     */
    private function generateCpf(): string
    {
        $n = [];
        for ($i = 0; $i < 9; $i++) {
            $n[] = rand(0, 9);
        }

        // Dígito 1
        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += $n[$i] * (10 - $i);
        }
        $d1 = 11 - ($sum % 11);
        $n[] = $d1 >= 10 ? 0 : $d1;

        // Dígito 2
        $sum = 0;
        for ($i = 0; $i < 10; $i++) {
            $sum += $n[$i] * (11 - $i);
        }
        $d2 = 11 - ($sum % 11);
        $n[] = $d2 >= 10 ? 0 : $d2;

        return implode('', $n);
    }
}
