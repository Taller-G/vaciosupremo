# custom

Clean Architecture boilerplate using **JavaScript + HTML + CSS**.

This project is intentionally structured into strict Clean Architecture layers and uses **Vite** for local development and production builds.

## Requirements
- Node.js 18+ (recommended)

## Setup
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

## Project structure (Clean Architecture)
All source code lives inside `src/` and is organized by layer:

- `src/domain/` → Entities, Value Objects, Domain Services, Repository **interfaces**
- `src/application/` → Use Cases (`execute(dto)`), DTOs, application errors
- `src/infrastructure/` → External implementations (e.g. repository implementations)
- `src/interfaces/` → Entry points (web UI / controllers). No business logic.

### Dependency rule (must always point inward)
- `interfaces → application → domain`
- `infrastructure → application → domain`
- `domain` imports **nothing** from outside itself

## Included example
A tiny “Welcome” feature demonstrating:
- **Domain**: `User` entity, `UserName` value object, `WelcomeMessageService`
- **Application**: `GetWelcomeMessageUseCase` with `execute(dto)`
- **Interfaces**: a small web UI + controller calling the use case
- **Infrastructure**: `LocalStorageUserRepository` implementing the domain repository interface (example implementation)

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — lint
- `npm run format` — format with Prettier
