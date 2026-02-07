<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed permissions and roles first
        $this->call(PermissionsSeeder::class);

        // Then seed admin user
        $this->call(AdminUserSeeder::class);

        // Seed symptoms
        $this->call(SymptomSeeder::class);

        // Seed sample notifications
        $this->call(NotificationSeeder::class);
    }
}
