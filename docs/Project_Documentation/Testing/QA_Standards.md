# QA Standards

## 1. Code Quality Gates
- **Linting & Formatting:** ESLint and Prettier (or Flake8/Black for Python) must run on every commit. Code failing linting cannot be merged into `main`.
- **Type Safety:** The codebase must utilize strict typing (TypeScript or Python Type Hints) to prevent runtime errors associated with complex JSON payloads returned by LLMs.
- **Test Coverage:** A minimum of 70% unit test coverage is required for all mathematical and data-transformation utility functions (e.g., the scoring calculator, the resume parser).

## 2. LLM Prompt QA
Because LLMs are non-deterministic, prompts must be treated as code and subjected to rigorous QA.
- **Regression Testing Prompts:** When a prompt is updated (e.g., the scoring prompt), it must be run against a static, benchmarked transcript. The generated score must not deviate by more than +/- 1.0 from the baseline score.
- **JSON Enforcement:** The scoring prompt must explicitly demand JSON output. QA must verify that the backend implements fallback parsing or retry logic in case the LLM wraps the JSON in markdown code blocks (` ```json ... ``` `).

## 3. Deployment Gates
- A pull request requires at least one peer review before merging.
- GitHub Actions must pass all automated tests before the Render deployment webhook is triggered.
