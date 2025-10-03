 

Express + Firebase Firestore (users/products/categories) with JWT auth.

## Run

1. Put your Firebase service account at `config/serviceAccountKey.json` (already present in this repo).
2. Optional: create `.env` with:
   - `PORT=3000`
   - `JWT_SECRET=change_me`
   - `CACHE_TTL_MS=30000`
3. Install deps: `npm install`
4. Start: `npm run dev` (or `npm start`)

Base URL: `http://localhost:3000/api`

## Endpoints

- `GET /health` — service check
- `POST /auth/signup` — { name, email, password }
- `POST /auth/signin` — { email, password } → returns { token }
- `GET /categories` — list categories
- `POST /categories` (auth) — { name }
- `GET /products` — list products
- `POST /products` (auth) — { name, price, description?, categoryId? }

Products are saved with `createdBy` (logged-in user id) and optional `categoryId`.

## Postman

Import `postman/Day3.postman_collection.json`. Set `{{email}}` if needed. After `Signin`, token is saved to `{{token}}` automatically.

## Validation

Requests validated via Joi in `src/validation/*` and `src/middlewares/validate.js`.

## GitHub
- Initialize and commit locally:
  - `git init`
  - `git add .`
  - `git commit -m "feat: express + firestore api with jwt, users/products/categories"`
- Create a GitHub repo named for clarity, e.g. `express-firestore-jwt-api`.
- Link and push:
  - `git remote add origin https://github.com/<your-username>/express-firestore-jwt-api.git`
  - `git branch -M main`
  - `git push -u origin main`
