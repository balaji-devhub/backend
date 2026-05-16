# User Form Backend

Simple Node.js (ESM) Express backend for the user form submission app.

---

# Features

- Express.js backend using ES Modules
- REST API endpoint for form submission
- Easy local development setup
- Supports frontend hosted separately
- Works with ngrok port forwarding for public access

---

# Requirements

- Node.js v18+ recommended
- npm

---

# Installation

Clone the project and install dependencies:

```bash
npm install
```

---

# Running the Server

Start the backend server:

```bash
npm start
```

For development with auto-restart on file changes:

```bash
npm run dev
```

Server runs at:

```txt
http://localhost:3000
```

---

# API Endpoint

## POST `/api/submit`

Backend endpoint:

```txt
http://localhost:3000/api/submit
```

Example frontend usage:

```js
const API_ENDPOINT = "http://localhost:3000/api/submit";

async function submitForm(data) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);
}
```

---

#
