# Agent Instructions for yt-downloader

## Build/Lint/Test Commands

### Backend (FastAPI/Python)
- Install: `uv sync`
- Run: `fastapi run --host 0.0.0.0 --port 8000 main.py`
- No dedicated lint/test commands configured

### Frontend (React/TypeScript)
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Code Style Guidelines

### Python (Backend)
- **Imports**: stdlib → third-party → local modules
- **Naming**: snake_case for functions/variables, PascalCase for classes
- **Types**: Use type hints extensively with `typing` module
- **Settings**: Use pydantic-settings, instantiate at module level
- **Error Handling**: Use FastAPI's HTTPException for API errors
- **DTOs**: Pydantic BaseModel classes in `dtos/` directory

### TypeScript/React (Frontend)
- **Strict Mode**: Enabled with noUnusedLocals/noUnusedParameters
- **Imports**: Use ES modules with explicit file extensions
- **Components**: Functional components with TypeScript
- **Styling**: Tailwind CSS classes
- **Forms**: React Hook Form with Zod validation
- **Linting**: ESLint with React/TypeScript rules

### General
- **No comments** unless explicitly requested
- **Security**: Never expose secrets/keys in code or logs
- **Dependencies**: Only use libraries already in pyproject.toml/package.json