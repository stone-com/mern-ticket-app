const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Get notes for a ticket
// GET /api/tickets/:ticketId/notes
// Protected route
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the ID in JWT(being set in auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    request.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// create a note for a ticket
// POST /api/tickets/:ticketId/notes
// Protected route
const addNote = asyncHandler(async (req, res) => {
  // Get user using the ID in JWT(being set in auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    request.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
