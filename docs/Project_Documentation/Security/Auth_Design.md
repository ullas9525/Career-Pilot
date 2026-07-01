# Authentication Design

## 1. Auth Strategy
CareerPilot implements a custom JSON Web Token (JWT) strategy for the MVP to minimize external dependencies and costs, rather than relying on heavy third-party providers like Auth0 or Firebase Auth.

## 2. Password Security
- Passwords are never stored in plain text.
- Upon registration, the plain text password is piped through `bcrypt` with a minimum salt round of 10.
- The resulting hash is stored in the `users.password_hash` column.

## 3. JWT Structure
- **Algorithm:** HS256 (HMAC with SHA-256).
- **Header:** `{"alg": "HS256", "typ": "JWT"}`
- **Payload:**
  ```json
  {
    "userId": "uuid-v4",
    "role": "STUDENT",
    "universityId": "uuid-v4",
    "iat": 1698400000,
    "exp": 1698486400
  }
  ```
- **Signature:** Signed using a highly secure `JWT_SECRET` stored only in the Render environment variables.

## 4. Transmission & Storage
- Tokens are transmitted to the client in the JSON response of the `/login` endpoint.
- For maximum security against Cross-Site Scripting (XSS), the frontend should ideally store this token in memory or an `HttpOnly` cookie. If `localStorage` is used for ease of development in MVP, strict Content Security Policies (CSP) must be enforced to prevent XSS token theft.
