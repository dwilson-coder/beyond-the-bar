// server/controllers/eventController.js
const Event = require('../models/Event');
const User = require('../models/User');
const { EVENT_STATUSES } = require('../models/Event');
const { validateEvent, hasErrors } = require('../utils/validators');

const isAdmin = (user) => user.role === 'admin';

// Fields a client may set on their own booking; pricing and staffing are admin-only
const CLIENT_FIELDS = ['title', 'type', 'date', 'startTime', 'endTime', 'venue', 'address', 'guests', 'package', 'notes'];
const ADMIN_FIELDS = [...CLIENT_FIELDS, 'bartenders', 'total', 'paid', 'status'];

const pick = (source, fields) =>
  Object.fromEntries(fields.filter((f) => source[f] !== undefined).map((f) => [f, source[f]]));

// GET /api/events — admins see everything, clients see their own
const listEvents = async (req, res) => {
  const filter = isAdmin(req.user) ? {} : { client: req.user._id };
  const events = await Event.find(filter).sort({ date: 1 }).populate('client', 'name email');
  res.json({ events });
};

// GET /api/events/:id
const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('client', 'name email');
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  if (!isAdmin(req.user) && !event.client._id.equals(req.user._id)) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  res.json({ event });
};

// POST /api/events — clients book for themselves; admins may pass clientId
const createEvent = async (req, res) => {
  const errors = validateEvent(req.body);
  if (hasErrors(errors)) return res.status(400).json({ message: 'Please check the highlighted fields.', errors });

  const admin = isAdmin(req.user);
  let clientId = req.user._id;

  if (admin && req.body.clientId) {
    const client = await User.findOne({ _id: req.body.clientId, role: 'client' });
    if (!client) return res.status(400).json({ message: 'clientId must belong to a client account.' });
    clientId = client._id;
  }

  const event = await Event.create({
    ...pick(req.body, admin ? ADMIN_FIELDS : CLIENT_FIELDS),
    client: clientId,
  });

  res.status(201).json({ event });
};

// PATCH /api/events/:id
const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  const admin = isAdmin(req.user);
  if (!admin && !event.client.equals(req.user._id)) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  if (req.body.status && !EVENT_STATUSES.includes(req.body.status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }

  event.set(pick(req.body, admin ? ADMIN_FIELDS : CLIENT_FIELDS));
  await event.save();
  res.json({ event });
};

module.exports = { listEvents, getEvent, createEvent, updateEvent };
