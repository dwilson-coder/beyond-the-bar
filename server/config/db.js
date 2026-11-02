// server/config/db.js — MongoDB connection
const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectDB = async () => {
  if (!mongoUri) {
    console.warn('[db] MONGODB_URI is not set — the API will start, but database routes return 503.');
    return false;
  }

  await mongoose.connect(mongoUri);
  console.log(`[db] Connected to MongoDB (${mongoose.connection.name})`);
  return true;
};

const isDbReady = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, isDbReady };
