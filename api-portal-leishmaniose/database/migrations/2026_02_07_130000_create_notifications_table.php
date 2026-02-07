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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('protocol')->unique();
            $table->string('name')->nullable();
            $table->string('cpf');
            $table->string('email');
            $table->string('state', 2);
            $table->string('city');
            $table->string('neighborhood')->nullable();
            $table->date('symptoms_date');
            $table->json('symptoms')->nullable();
            $table->text('details')->nullable();
            $table->enum('status', ['pending', 'in_analysis', 'confirmed', 'discarded'])->default('pending');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
