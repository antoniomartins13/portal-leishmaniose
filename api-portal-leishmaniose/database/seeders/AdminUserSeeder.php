<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear permission cache to ensure roles are loaded
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Criar usuário admin padrão
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@leishmaniose.gov.br'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin@123'),
                'email_verified_at' => now(),
            ]
        );

        // Atribuir role de admin
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole && !$adminUser->hasRole('admin')) {
            $adminUser->assignRole($adminRole);
        }

        // Criar pesquisador de exemplo
        $researcher = User::firstOrCreate(
            ['email' => 'pesquisador@leishmaniose.gov.br'],
            [
                'name' => 'Pesquisador Exemplo',
                'password' => Hash::make('pesquisador@123'),
                'email_verified_at' => now(),
            ]
        );

        $researcherRole = Role::where('name', 'pesquisador')->first();
        if ($researcherRole && !$researcher->hasRole('pesquisador')) {
            $researcher->assignRole($researcherRole);
        }

        // Criar gestor de exemplo
        $manager = User::firstOrCreate(
            ['email' => 'gestor@leishmaniose.gov.br'],
            [
                'name' => 'Gestor Exemplo',
                'password' => Hash::make('gestor@123'),
                'email_verified_at' => now(),
            ]
        );

        $managerRole = Role::where('name', 'gestor')->first();
        if ($managerRole && !$manager->hasRole('gestor')) {
            $manager->assignRole($managerRole);
        }

        $this->command->info('Usuários padrão criados com sucesso!');
        $this->command->info('Admin: admin@leishmaniose.gov.br / senha: admin@123');
        $this->command->info('Pesquisador: pesquisador@leishmaniose.gov.br / senha: pesquisador@123');
        $this->command->info('Gestor: gestor@leishmaniose.gov.br / senha: gestor@123');
    }
}
