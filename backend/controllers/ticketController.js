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
  const { product, description } = req.body;

  if (!product || !description) {
    request.status(400);
    throw new Error('Please add a product and description');
  }

  // Get user using the ID in JWT(being set in auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

module.exports = { getTickets, createTicket };
