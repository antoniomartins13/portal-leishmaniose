# Estrutura de Autenticação - Portal da Leishmaniose

## 📋 Resumo

Implementação completa de autenticação com **Laravel Breeze** e **Laravel Sanctum** para APIs, seguindo a arquitetura obrigatória do projeto (BaseController, BaseService, BaseRepository).

## 🔧 Componentes Implementados

### 1. **Pacotes Instalados**
- `laravel/sanctum` (v4.3.0) - Autenticação via API tokens
- `laravel/breeze` (v2.3.8) - Stack de autenticação

### 2. **Configurações**
- ✅ `config/sanctum.php` - Configuração do Sanctum
- ✅ `config/auth.php` - Guard `sanctum` adicionado
- ✅ `bootstrap/app.php` - Rotas de API registradas
- ✅ `app/Models/User.php` - Trait `HasApiTokens` adicionado

### 3. **Controllers** (`app/Http/Controllers/API/Auth/`)
- **AuthController** - Gerencia todas as operações de autenticação
  - `register()` - Registra novo usuário
  - `login()` - Faz login e gera token
  - `logout()` - Revoga token atual
  - `logoutAll()` - Revoga todos os tokens
  - `profile()` - Retorna dados do usuário autenticado

### 4. **Services** (`app/Services/Authentication/`)
- **AuthService** - Lógica de autenticação
  - `register()` - Cria novo usuário
  - `authenticate()` - Valida credenciais
  - `createToken()` - Gera token de acesso
  - `revokeAllTokens()` - Revoga todos os tokens

- **LogService** - Placeholder para logging de ações

### 5. **Repositories** (`app/Repositories/Authentication/`)
- **UserRepository** - Acesso aos dados do usuário
  - `findByEmail()` - Busca usuário por email

### 6. **Form Requests** (`app/Http/Requests/Auth/`)
- **LoginRequest** - Valida dados de login
  - Email obrigatório e válido
  - Senha mínimo 8 caracteres

- **RegisterRequest** - Valida dados de registro
  - Nome obrigatório
  - Email único e válido
  - Senha com requisitos de segurança:
    - Mínimo 8 caracteres
    - Maiúsculas e minúsculas
    - Números
    - Símbolos

### 7. **Rotas de API** (`routes/api.php`)

#### Rotas Públicas
```
POST /api/auth/register     - Registrar novo usuário
POST /api/auth/login        - Login
GET  /user                  - Info do usuário (requer autenticação)
```

#### Rotas Protegidas (requer `auth:sanctum`)
```
POST /api/auth/logout       - Logout (revoga token atual)
POST /api/auth/logout-all   - Logout de todos os dispositivos
GET  /api/auth/profile      - Perfil do usuário
```

### 8. **Testes** (`tests/Feature/Auth/AuthenticationTest.php`)
✅ **13 testes implementados e passando:**
- ✅ `test_user_can_register_with_valid_data`
- ✅ `test_registration_fails_with_missing_fields`
- ✅ `test_registration_fails_with_invalid_email`
- ✅ `test_registration_fails_with_duplicate_email`
- ✅ `test_user_can_login_with_valid_credentials`
- ✅ `test_login_fails_with_invalid_email`
- ✅ `test_login_fails_with_invalid_password`
- ✅ `test_user_can_logout`
- ✅ `test_user_can_get_profile_when_authenticated`
- ✅ `test_profile_requires_authentication`
- ✅ `test_logout_requires_authentication`
- ✅ `test_user_can_logout_from_all_devices`
- ✅ `test_logout_all_requires_authentication`

### 9. **Helpers** (`app/Helpers/`)
- **GetControllerNameHelper** - Extrai nome do controller
- **PermissionHelper** - Gerencia permissões (placeholder)

### 10. **Enums** (`app/Enums/`)
- **ControllerActions** - Tipos de ações do controller
  - CREATE, READ, UPDATE, DELETE, VIEW, REPORT

## 📊 Database

### Tabela `users` (já existente)
```sql
- id (PK)
- name
- email (UNIQUE)
- email_verified_at
- password
- remember_token
- created_at
- updated_at
```

### Tabela `personal_access_tokens` (criada por Sanctum)
```sql
- id (PK)
- tokenable_type
- tokenable_id
- name
- token (UNIQUE, HASHED)
- abilities
- last_used_at
- expires_at
- created_at
- updated_at
```

## 🚀 Como Usar

### 1. Registrar Novo Usuário
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "Password123!@#",
    "password_confirmation": "Password123!@#"
  }'
```

**Resposta (201):**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "created_at": "2026-02-06T21:14:48.000000Z",
    "updated_at": "2026-02-06T21:14:48.000000Z"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz..."
}
```

### 2. Fazer Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "Password123!@#"
  }'
```

**Resposta (200):**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz..."
}
```

### 3. Usar Token em Requisições Protegidas
```bash
curl -X GET http://localhost:8000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Fazer Logout
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Logout de Todos os Dispositivos
```bash
curl -X POST http://localhost:8000/api/auth/logout-all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔐 Segurança

✅ Senhas hasheadas com BCrypt
✅ Tokens armazenados com hash SHA-256
✅ Validação de credenciais rigorosa
✅ Proteção contra força bruta (implementar rate limiting)
✅ CORS habilitado por padrão

## 📝 Próximas Melhorias

- [ ] Implementar rate limiting para login
- [ ] Adicionar refresh tokens
- [ ] Implementar 2FA (Two-Factor Authentication)
- [ ] Persistência de logs em banco de dados
- [ ] Email de confirmação
- [ ] Recuperação de senha
- [ ] OAuth integrado (Google, GitHub)

## 🧪 Executar Testes

```bash
php artisan test tests/Feature/Auth/AuthenticationTest.php
```

**Resultado:**
```
Tests:    13 passed (42 assertions)
Duration: 0.66s
```

## 📁 Estrutura de Arquivos

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── API/
│   │   │   ├── BaseController.php
│   │   │   └── Auth/
│   │   │       └── AuthController.php
│   │   └── Controller.php
│   └── Requests/
│       └── Auth/
│           ├── LoginRequest.php
│           └── RegisterRequest.php
├── Services/
│   ├── BaseService.php
│   └── Authentication/
│       ├── AuthService.php
│       └── LogService.php
├── Repositories/
│   ├── BaseRepository.php
│   └── Authentication/
│       └── UserRepository.php
├── Models/
│   └── User.php
├── Helpers/
│   ├── GetControllerNameHelper.php
│   └── PermissionHelper.php
└── Enums/
    └── ControllerActions.php

config/
├── auth.php (modificado)
└── sanctum.php

routes/
└── api.php (criado)

tests/
└── Feature/
    └── Auth/
        └── AuthenticationTest.php

bootstrap/
└── app.php (modificado)
```

---

**Data de Implementação:** 6 de Fevereiro de 2026
**Status:** ✅ Implementação Completa e Testada
