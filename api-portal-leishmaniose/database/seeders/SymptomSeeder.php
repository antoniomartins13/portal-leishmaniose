<?php

namespace Database\Seeders;

use App\Models\Symptom;
use Illuminate\Database\Seeder;

class SymptomSeeder extends Seeder
{
    /**
     * Seed the application's database with symptoms.
     */
    public function run(): void
    {
        $symptoms = [
            [
                'name' => 'Febre',
                'slug' => 'fever',
                'description' => 'Temperatura corporal elevada',
            ],
            [
                'name' => 'Perda de peso',
                'slug' => 'weight_loss',
                'description' => 'Emagrecimento não intencional',
            ],
            [
                'name' => 'Lesões na pele',
                'slug' => 'skin_lesions',
                'description' => 'Feridas ou úlceras cutâneas',
            ],
            [
                'name' => 'Aumento do fígado/baço',
                'slug' => 'enlarged_organs',
                'description' => 'Hepatoesplenomegalia',
            ],
            [
                'name' => 'Fadiga',
                'slug' => 'fatigue',
                'description' => 'Cansaço extremo e fraqueza',
            ],
            [
                'name' => 'Anemia',
                'slug' => 'anemia',
                'description' => 'Redução de hemoglobina no sangue',
            ],
            [
                'name' => 'Palidez',
                'slug' => 'paleness',
                'description' => 'Palidez cutânea e de mucosas',
            ],
            [
                'name' => 'Tosse',
                'slug' => 'cough',
                'description' => 'Tosse seca persistente',
            ],
            [
                'name' => 'Sangramento',
                'slug' => 'bleeding',
                'description' => 'Sangramentos nasais ou gengivais',
            ],
        ];

        foreach ($symptoms as $symptom) {
            Symptom::updateOrCreate(
                ['slug' => $symptom['slug']],
                $symptom
            );
        }
    }
}
