// controllers/ticketController.js
import * as glassix from '../services/glassixService.js';

export const create = async (req, res, next) => {
  try {
    const ticket = await glassix.createTicket();
    res.json(ticket);
  } catch (err) { next(err); }
};

export const token = async (req, res, next) => {
  try {
    const token = await glassix.getAccessToken();
    res.json(token);
  } catch (err) { next(err); }
};

export const send = async (req, res, next) => {
  try {
    const ticketId = req.params.ticketId || req.query.ticketId;
    const { text }   = req.body;
    const result = await glassix.sendMessage(ticketId, text);
    res.json(result);
  } catch (err) { next(err); }
};

export const close = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const result = await glassix.closeTicket(ticketId);
    res.json(result);
  } catch (err) { next(err); }
};
