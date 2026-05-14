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

// ─── Validator ────────────────────────────────────────────────
const validateUser = ({ name, email, description }) => {
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2)
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters.',
    });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email))
    errors.push({
      field: 'email',
      message: 'A valid email address is required.',
    });

  if (
    !description ||
    typeof description !== 'string' ||
    description.trim().length < 5
  )
    errors.push({
      field: 'description',
      message: 'Description must be at least 5 characters.',
    });

  return errors;
};

// ─── Routes ──────────────────────────────────────────────────

// POST /api/submit
app.post('/api/submit', (req, res) => {
  const { name, email, description } = req.body ?? {};

  const errors = validateUser({ name, email, description });

  if (errors.length > 0) {
    return res.status(400).json(
      buildResponse({
        success: false,
        message: 'Validation failed. Please fix the errors below.',
        errors,
      })
    );
  }

  // Simulated saved record (replace with your DB logic here)
  const savedUser = {
    id: `usr_${Math.random().toString(36).slice(2, 10)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    description: description.trim(),
    created_at: new Date().toISOString(),
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

// GET /api/submit — method not allowed
app.get('/api/submit', (_req, res) => {
  res.status(200).json(
    buildResponse({
      success: true,
      message: 'User submitted successfully.',
      data: savedUser,
    })
  );
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
    meta: { timestamp: new Date().toISOString() },
  });
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📬 POST endpoint: http://localhost:${PORT}/api/submit`);
});
