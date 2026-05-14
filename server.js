import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Helper: build JSON response ─────────────────────────────
const buildResponse = ({ success, message, data = null, errors = null }) => ({
  success,
  message,
  ...(data && { data }),
  ...(errors && { errors }),
  meta: {
    path: '/api/submit',
    method: 'POST',
    timestamp: new Date().toISOString(),
  },
});

// ─── Routes ──────────────────────────────────────────────────

// POST /api/submit
app.post('/api/submit', (req, res) => {
  const {
    latitude,
    longitude,
    accuracy,
    online,
    userAgent,
    platform,
    language,
  } = req.body ?? {};

  // Simulated saved record (replace with your DB logic here)
  const savedUser = {
    latitude,
    longitude,
    accuracy,
    online,
    userAgent,
    platform,
    language,
  };

  console.log('✅ New submission:', savedUser);

  return res.status(201).json(
    buildResponse({
      success: true,
      message: 'User submitted successfully.',
      data: savedUser,
    })
  );
});

// essential ting will update later

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📬 POST endpoint: http://localhost:${PORT}/api/submit`);
});
