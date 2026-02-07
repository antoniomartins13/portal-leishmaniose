<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabela de sintomas
        Schema::create('symptoms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Tabela pivot notification_symptom
        Schema::create('notification_symptom', function (Blueprint $table) {
            $table->id();
            $table->foreignId('notification_id')->constrained()->onDelete('cascade');
            $table->foreignId('symptom_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['notification_id', 'symptom_id']);
        });

        // Remove a coluna symptoms (JSON) da tabela notifications
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropColumn('symptoms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->json('symptoms')->nullable();
        });

        Schema::dropIfExists('notification_symptom');
        Schema::dropIfExists('symptoms');
    }
};
