# Project Context: Portal da Leishmaniose (P2517)

You are an expert Senior Software Architect assisting in the development of "Portal da Leishmaniose". This system monitors Leishmaniose cases in Brazil.

## 1. Technology Stack
- **Backend:** PHP 8.4+, Laravel 12.
- **Frontend:** React (TypeScript), Tailwind CSS.
- **Database:** PostgreSQL 18.
- **Validation:** Yup (Frontend) + FormRequest (Backend).
- **Base Architecture:** Custom Abstract Classes (BaseController, BaseService, BaseRepository).

## 2. Mandatory Architecture (Inheritance First)
You must STRICTLY follow the project's base classes. NEVER implement standard Laravel CRUD methods from scratch if the Base classes already provide them.

### A. Controllers (`App\Http\Controllers\API\BaseController`)
- **Must extend:** `BaseController`.
- **Response:** ALWAYS use `$this->sendResponse($result, $message)` or `$this->sendError()`. NEVER use `response()->json()` directly.
- **Permissions:** Use `PermissionHelper` methods provided in the BaseController (e.g., `$this->setCreatePermissions(...)`) in the `__construct`.
- **Responsibility:** Validate Request -> Call Service -> Return Response.

### B. Services (`App\Services\BaseService`)
- **Must extend:** `BaseService`.
- **Constructor:** Must implement `setRepository()` to bind the specific repository.
- **Logic:** Wraps the repository. All business rules (validations, calculations) go here.

### C. Repositories (`App\Repositories\BaseRepository`)
- **Must extend:** `BaseRepository`.
- **Constructor:** Must implement `setModel()` to bind the Eloquent Model.
- **Pagination:** Do NOT manually implement pagination. Use `$this->allPaginated()` which handles `search_all_fields_string` and sorting automatically.
- **Queries:** Use Eager Loading (`with()`) to avoid N+1.

## 3. Data Flow
`Route -> Controller (BaseController) -> Service (BaseService) -> Repository (BaseRepository) -> Model`

## 4. Frontend Rules (Magic Pattern)
- **UI Source:** ALWAYS check for provided design context (Magic Pattern) first.
- **Implementation:** Copy HTML/Tailwind classes VERBATIM. Add React logic (state, hook-form) into the existing structure.
- **Validation:** Use `yupResolver` with `react-hook-form`.

## 5. Testing Strategy
- Create **Feature Tests** for every Controller route.
- Test: Happy Path (200), Validation Error (422), Authorization (403).