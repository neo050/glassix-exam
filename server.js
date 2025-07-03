import express from 'express';
import morgan  from 'morgan';
import ticketRoutes from './routes/tickets.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/tickets', ticketRoutes);

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`API up on ${process.env.PORT || 3000}`)
);
