<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Users
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Roles
            'roles.view',
            'roles.create',
            'roles.delete',

            // Cases
            'cases.view',
            'cases.create',
            'cases.edit',
            'cases.delete',

            // Reports
            'reports.view',
            'reports.create',
            'reports.edit',
            'reports.delete',

            // Settings
            'settings.view',
            'settings.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission, 'guard_name' => 'sanctum']
            );
        }

        // Create roles with 'sanctum' guard and assign permissions
        $admin = Role::firstOrCreate(
            ['name' => 'admin', 'guard_name' => 'sanctum']
        );
        $admin->syncPermissions(Permission::where('guard_name', 'sanctum')->get());

        $gestor = Role::firstOrCreate(
            ['name' => 'gestor', 'guard_name' => 'sanctum']
        );
        $gestor->syncPermissions([
            'cases.view',
            'reports.view',
            'reports.create',
            'reports.edit',
            'users.view',
            'roles.view',
        ]);

        $pesquisador = Role::firstOrCreate(
            ['name' => 'pesquisador', 'guard_name' => 'sanctum']
        );
        $pesquisador->syncPermissions([
            'cases.view',
            'cases.create',
            'cases.edit',
            'reports.view',
        ]);

        $this->command->info('Permissões e roles criados com sucesso!');
    }
}
