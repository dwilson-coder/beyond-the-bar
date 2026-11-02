// server/models/Event.js — a client's bartending booking
const mongoose = require('mongoose');

const EVENT_TYPES = ['Wedding', 'Corporate event', 'Private party', 'Birthday', 'Fundraiser', 'Other'];
const PACKAGES = ['Essentials', 'Signature', 'Premier', 'Not sure yet'];
const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const eventSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    type: { type: String, enum: EVENT_TYPES, default: 'Other' },
    date: { type: Date, required: true },
    startTime: { type: String, trim: true },
    endTime: { type: String, trim: true },
    venue: { type: String, trim: true, maxlength: 140 },
    address: { type: String, trim: true, maxlength: 240 },
    guests: { type: Number, min: 1, required: true },
    package: { type: String, enum: PACKAGES, default: 'Not sure yet' },
    bartenders: { type: Number, min: 0, default: 0 },
    total: { type: Number, min: 0, default: 0 },
    paid: { type: Number, min: 0, default: 0 },
    status: { type: String, enum: STATUSES, default: 'pending' },
    notes: { type: String, trim: true, maxlength: 2000 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Event', eventSchema);
module.exports.EVENT_STATUSES = STATUSES;
