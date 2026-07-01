# CI/CD Pipeline

Continuous Integration and Continuous Deployment are managed entirely through GitHub Actions and Render's native Git integrations.

## 1. Continuous Integration (CI)
Triggered on every Pull Request (PR) against the `main` branch.
- **Job 1: Lint & Format.** Runs Prettier and ESLint. Fails if style violations exist.
- **Job 2: Unit Testing.** Runs the test suite (Jest/PyTest). Fails if coverage drops below 70% or if any test fails.
- **Job 3: Dependency Audit.** Scans for CVEs in the package manager.

## 2. Continuous Deployment (CD)
Triggered automatically when a PR is merged into the `main` branch.
- **Frontend (Vercel/Render Static):** Webhooks notify the host to pull the latest `main` branch, execute `npm run build`, and deploy the static assets to the global CDN.
- **Backend (Render Web Service):** Webhooks notify Render to pull the latest `main` branch, install dependencies (`pip install`), run any pending database migrations (e.g., `alembic upgrade head`), and restart the Python/FastAPI server.

## 3. Deployment Freeze
To prevent disrupting live mock interviews, automated deployments to the production environment are disabled during peak student usage hours (e.g., 6 PM - 11 PM locally). Deployments are queued and executed during low-traffic windows.
