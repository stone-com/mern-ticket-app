const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Get user tickets
// GET /api/tickets/
// Protected route
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get tickets' });
});

// create new ticket
// POST /api/tickets/
// Protected route
const createTicket = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Create ticket' });
  });


  module.exports = {getTickets, createTicket}