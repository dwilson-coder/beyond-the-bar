// server/routes/eventRoutes.js
const express = require('express');
const { listEvents, getEvent, createEvent, updateEvent } = require('../controllers/eventController');
const { requireDb, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireDb, protect);

router.route('/').get(listEvents).post(createEvent);
router.route('/:id').get(getEvent).patch(updateEvent);

module.exports = router;
