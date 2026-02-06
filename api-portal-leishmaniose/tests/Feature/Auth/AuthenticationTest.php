<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test user registration with valid data.
     */
    public function test_user_can_register_with_valid_data(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'Password123!@#',
            'password_confirmation' => 'Password123!@#',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
                'token',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
            'name' => 'John Doe',
        ]);
    }

    /**
     * Test registration fails with missing fields.
     */
    public function test_registration_fails_with_missing_fields(): void
    {
        $response = $this->postJson('/api/auth/register', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /**
     * Test registration fails with invalid email.
     */
    public function test_registration_fails_with_invalid_email(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'password' => 'Password123!@#',
            'password_confirmation' => 'Password123!@#',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test registration fails with duplicate email.
     */
    public function test_registration_fails_with_duplicate_email(): void
    {
        User::factory()->create(['email' => 'john@example.com']);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'Password123!@#',
            'password_confirmation' => 'Password123!@#',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test user can login with valid credentials.
     */
    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('Password123!@#'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'john@example.com',
            'password' => 'Password123!@#',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                ],
                'token',
            ]);
    }

    /**
     * Test login fails with invalid email.
     */
    public function test_login_fails_with_invalid_email(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'Password123!@#',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'errors' => 'Invalid credentials',
            ]);
    }

    /**
     * Test login fails with invalid password.
     */
    public function test_login_fails_with_invalid_password(): void
    {
        User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('CorrectPassword123!@#'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'john@example.com',
            'password' => 'WrongPassword123!@#',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'errors' => 'Invalid credentials',
            ]);
    }

    /**
     * Test user can logout.
     */
    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('api-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/auth/logout');

        $response->assertStatus(200);
    }

    /**
     * Test user can get profile when authenticated.
     */
    public function test_user_can_get_profile_when_authenticated(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('api-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/auth/profile');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                ],
            ]);
    }

    /**
     * Test profile endpoint requires authentication.
     */
    public function test_profile_requires_authentication(): void
    {
        $response = $this->getJson('/api/auth/profile');

        $response->assertStatus(401);
    }

    /**
     * Test logout requires authentication.
     */
    public function test_logout_requires_authentication(): void
    {
        $response = $this->postJson('/api/auth/logout');

        $response->assertStatus(401);
    }

    /**
     * Test user can logout from all devices.
     */
    public function test_user_can_logout_from_all_devices(): void
    {
        $user = User::factory()->create();
        $token1 = $user->createToken('token1')->plainTextToken;
        $token2 = $user->createToken('token2')->plainTextToken;

        // Verify tokens exist
        $this->assertEquals(2, $user->tokens()->count());

        // Logout from all devices
        $response = $this->withHeader('Authorization', "Bearer {$token1}")
            ->postJson('/api/auth/logout-all');

        $response->assertStatus(200);

        // Verify all tokens are deleted
        $this->assertEquals(0, $user->fresh()->tokens()->count());
    }

    /**
     * Test that logout-all requires authentication.
     */
    public function test_logout_all_requires_authentication(): void
    {
        $response = $this->postJson('/api/auth/logout-all');

        $response->assertStatus(401);
    }
}
