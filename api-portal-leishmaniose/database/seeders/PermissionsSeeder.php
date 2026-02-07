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
            'roles.edit',
            'roles.delete',

            // Symptoms
            'symptoms.view',
            'symptoms.create',
            'symptoms.edit',
            'symptoms.delete',

            // Notifications
            'notifications.view',
            'notifications.edit',
            'notifications.delete',
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
            'users.view',
            'roles.view',
            'notifications.view',
            'notifications.edit',
        ]);

        $pesquisador = Role::firstOrCreate(
            ['name' => 'pesquisador', 'guard_name' => 'sanctum']
        );
        $pesquisador->syncPermissions([
            'notifications.view',
        ]);

        $this->command->info('Permissões e roles criados com sucesso!');
    }
}
