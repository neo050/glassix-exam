import { Router } from 'express';
import * as c from '../controllers/ticketController.js';

const r = Router();
r.post('/token'      , c.token);  
r.post('/create'      , c.create);               // POST /api/tickets/create
r.post('/send/:ticketId'   , c.send);                 // POST /api/tickets/:id
r.put ('/close/:ticketId'   , c.close);                // PUT  /api/tickets/:id
 
export default r;
