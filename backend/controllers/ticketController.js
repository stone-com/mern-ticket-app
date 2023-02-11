const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Get user tickets
// GET /api/tickets/
// Protected route
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the ID in JWT(being set in auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// create new ticket
// POST /api/tickets/
// Protected route
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Create ticket' });
});

module.exports = { getTickets, createTicket };
