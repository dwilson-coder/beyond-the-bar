// server/server.js — API entry point
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { port, clientUrl, isProduction } = require('./config/env');
const { connectDB, isDbReady } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Behind a hosting proxy, use the visitor's IP (not the proxy's) for rate limiting
if (isProduction) app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: isDbReady() ? 'connected' : 'not connected' });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error(`[db] Could not connect to MongoDB: ${err.message}`);
  }

  app.listen(port, () => console.log(`[api] Listening on http://localhost:${port}`));
};

start();
