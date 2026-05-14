# user-form-backend

Simple Node.js (ESM) Express backend for the user form submission app.

## Setup

```bash
npm install
npm start
# or for auto-restart on file changes:
npm run dev
```

Server runs at: http://localhost:3000

---

## Endpoint

### POST /api/submit

**Request body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "description": "A short description about me."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User submitted successfully.",
  "data": {
    "id": "usr_abc12345",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "description": "A short description about me.",
    "created_at": "2026-05-15T10:00:00.000Z"
  },
  "meta": {
    "path": "/api/submit",
    "method": "POST",
    "timestamp": "2026-05-15T10:00:00.000Z"
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed. Please fix the errors below.",
  "errors": [
    { "field": "email", "message": "A valid email address is required." }
  ],
  "meta": {
    "path": "/api/submit",
    "method": "POST",
    "timestamp": "2026-05-15T10:00:00.000Z"
  }
}
```

---

## Files

| File | Purpose |
|------|---------|
| `server.js` | Main Express app (ESM) |
| `package.json` | `"type": "module"` config + deps |
| `.gitignore` | Ignores node_modules & .env |

---

## Connect to the HTML form

In `user-form.html`, update:
```js
const API_ENDPOINT = "http://localhost:3000/api/submit";
```
