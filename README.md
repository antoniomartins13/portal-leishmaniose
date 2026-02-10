# Portal Leishmaniose

Portal web para notificação e gestão de casos de leishmaniose. Usuários públicos submetem notificações de casos (com sintomas e endereço via CEP); usuários autenticados (admin, gestor, pesquisador) gerenciam usuários, papéis, sintomas e revisam notificações.

## Arquitetura

Monorepo com duas aplicações independentes que se comunicam via REST API:

| Camada | Tecnologias |
|--------|------------|
| **API** (`api-portal-leishmaniose/`) | Laravel 12, PHP 8.4, Sanctum (auth por token), Spatie Permission (RBAC), PostgreSQL |
| **Frontend** (`front-portal-leishmaniose/`) | React 19, TypeScript, Vite, Tailwind CSS, React Router v6, Axios |
| **Banco de dados** | PostgreSQL 18 (via Docker) |

## Requisitos

- **PHP** >= 8.2
- **Composer** >= 2.x
- **Node.js** >= 18.x e **npm** >= 9.x
- **Docker** e **Docker Compose** (para PostgreSQL e pgAdmin)
- **Git**

## Setup

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio> portal-leishmaniose
cd portal-leishmaniose
```

### 2. Subir o banco de dados (Docker)

```bash
docker compose -f docker/docker-compose.yml up -d
```

Isso inicia:
- **PostgreSQL** na porta `5432` (usuário: `root`, senha: `secret`, banco: `laravel`)
- **pgAdmin** em [http://localhost:5050](http://localhost:5050) (login: `admin@admin.com` / `admin`)

### 3. Configurar a API

```bash
cd api-portal-leishmaniose

# Instalar dependências, gerar .env, chave, migrar e compilar assets
composer run setup
```

O comando `setup` executa automaticamente:
1. `composer install`
2. Copia `.env.example` para `.env`
3. `php artisan key:generate`
4. `php artisan migrate --force`
5. `npm install` + `npm run build`

> **Nota:** Confira o arquivo `.env` e ajuste as variáveis de banco caso necessário:
> ```
> DB_CONNECTION=pgsql
> DB_HOST=127.0.0.1
> DB_PORT=5432
> DB_DATABASE=laravel
> DB_USERNAME=root
> DB_PASSWORD=secret
> ```

#### Popular banco com dados iniciais

```bash
php artisan db:seed
```

Isso cria permissões, papéis e usuários de teste (veja a seção [Dados de Teste](#dados-de-teste)).

### 4. Configurar o Frontend

```bash
cd front-portal-leishmaniose
npm install
```

Crie um arquivo `.env` (ou `.env.local`) na raiz do frontend:

```
VITE_APP_API_URL=http://localhost:8000/api
```

## Como Executar

### API

```bash
cd api-portal-leishmaniose
composer run dev
```

Inicia simultaneamente:
- **Servidor Laravel** em [http://localhost:8000](http://localhost:8000)
- **Queue listener** (fila de jobs)
- **Vite** (assets em tempo real)

### Frontend

```bash
cd front-portal-leishmaniose
npm run dev
```

Abre automaticamente em [http://localhost:3000](http://localhost:3000).

## Dados de Teste

Após executar `php artisan db:seed`, os seguintes usuários ficam disponíveis:

| Papel | E-mail | Senha |
|-------|--------|-------|
| **Admin** | `admin@leishmaniose.gov.br` | `admin@123` |
| **Gestor** | `gestor@leishmaniose.gov.br` | `gestor@123` |
| **Pesquisador** | `pesquisador@leishmaniose.gov.br` | `pesquisador@123` |

### Permissões por papel

| Permissão | Admin | Gestor | Pesquisador |
|-----------|:-----:|:------:|:-----------:|
| `users.view` | ✅ | ✅ | ❌ |
| `users.create` | ✅ | ❌ | ❌ |
| `users.edit` | ✅ | ❌ | ❌ |
| `users.delete` | ✅ | ❌ | ❌ |
| `roles.view` | ✅ | ✅ | ❌ |
| `roles.create` | ✅ | ❌ | ❌ |
| `roles.edit` | ✅ | ❌ | ❌ |
| `roles.delete` | ✅ | ❌ | ❌ |
| `symptoms.view` | ✅ | ❌ | ❌ |
| `symptoms.create` | ✅ | ❌ | ❌ |
| `symptoms.edit` | ✅ | ❌ | ❌ |
| `symptoms.delete` | ✅ | ❌ | ❌ |
| `notifications.view` | ✅ | ✅ | ✅ |
| `notifications.edit` | ✅ | ✅ | ❌ |
| `notifications.delete` | ✅ | ❌ | ❌ |

O seeder também popula **sintomas** e **notificações de exemplo**.

## Como Rodar os Testes

### API (PHPUnit)

```bash
cd api-portal-leishmaniose

# Rodar todos os testes
composer run test

# Rodar um teste específico
php artisan test --compact --filter=test_user_can_login_with_valid_credentials

# Rodar apenas testes de Feature ou Unit
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit
```

Os testes usam **SQLite em memória** (`:memory:`), então não dependem do PostgreSQL rodando.

### Frontend (Build check)

```bash
cd front-portal-leishmaniose

# Verificação de tipos TypeScript + build de produção
npm run build
```

## Principais Endpoints da API

### Públicos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/register` | Cadastrar novo usuário |
| `POST` | `/api/auth/login` | Login (retorna token) |
| `POST` | `/api/notifications` | Submeter notificação de caso |
| `GET` | `/api/symptoms` | Listar sintomas (para formulários) |
| `GET` | `/api/reports/symptoms` | Relatório de sintomas |

### Autenticados (`Bearer token`)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/profile` | Perfil do usuário logado |
| `GET/POST/PUT/DELETE` | `/api/users` | CRUD de usuários |
| `GET/POST/PUT/DELETE` | `/api/roles` | CRUD de papéis |
| `GET` | `/api/permissions` | Listar permissões |
| `GET` | `/api/notifications` | Listar notificações |
| `PATCH` | `/api/notifications/{id}/status` | Alterar status da notificação |
| `GET` | `/api/notifications/export-csv` | Exportar notificações (CSV) |
| `GET` | `/api/notifications/export-pdf` | Exportar notificações (PDF) |
| `GET/POST/PUT/DELETE` | `/api/symptoms` | CRUD de sintomas |

## Formatação de Código

```bash
cd api-portal-leishmaniose
vendor/bin/pint --dirty   # Formata apenas arquivos alterados
```
