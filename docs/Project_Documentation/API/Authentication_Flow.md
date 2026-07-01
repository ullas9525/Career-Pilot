# Authentication Flow

CareerPilot utilizes a stateless JSON Web Token (JWT) architecture to securely authenticate and authorize users across the Vite React + JavaScript frontend and Python/FastAPI backend.

## 1. Login and Token Issuance
1. The client sends a `POST /api/auth/login` request with `email` and `password`.
2. The backend queries the Neon PostgreSQL database.
3. The password hash is verified (bcrypt.compare).
4. If valid, the backend generates an HS256 JWT signed with a highly secure, server-side secret (`JWT_SECRET`).
5. The JWT payload includes: `userId`, `role` (STUDENT or COORDINATOR), and `universityId`.
6. The JWT is returned to the client and stored securely in memory or an `HttpOnly` secure cookie (preferred for web applications to mitigate XSS).

## 2. Request Authorization (Middleware)
- All protected routes (e.g., `/api/interviews/*`) require the JWT to be passed in the `Authorization` header as a Bearer token.
- **Verification:** The backend middleware intercepts the request, verifies the JWT signature, and decodes the payload.
- **Role-Based Access Control (RBAC):**
  - If a STUDENT attempts to access `/api/dashboard/*`, the RBAC middleware reads the `role` from the JWT payload and immediately rejects the request with a `403 Forbidden` error without hitting the database.

## 3. Token Lifecycle
- **Expiration:** JWTs are configured to expire after 24 hours (`expiresIn: '24h'`).
- **Logout:** As JWTs are stateless, "logout" is achieved client-side by deleting the token. (A server-side blacklist is out of scope for the MVP to minimize DB load).
