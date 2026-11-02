// server/scripts/seedAdmin.js — creates (or promotes) the first admin account
// Usage: set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD in server/.env, then `npm run seed:admin`
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const User = require('../models/User');

const run = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (8+ characters) in server/.env first.');
  }

  if (!(await connectDB())) {
    throw new Error('Set MONGODB_URI in server/.env first.');
  }

  const email = ADMIN_EMAIL.trim().toLowerCase();
  const existing = await User.findOne({ email });

  if (existing) {
    existing.role = 'admin';
    existing.status = 'active';
    existing.password = ADMIN_PASSWORD;
    await existing.save();
    console.log(`[seed] Updated ${email} — now an admin.`);
  } else {
    await User.create({ name: ADMIN_NAME || 'Admin', email, password: ADMIN_PASSWORD, role: 'admin' });
    console.log(`[seed] Created admin account ${email}.`);
  }
};

run()
  .catch((err) => {
    console.error(`[seed] ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
