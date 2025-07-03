import express from 'express';
import morgan  from 'morgan';
import ticketRoutes from './routes/tickets.js';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/tickets', ticketRoutes);

app.use((err, req, res, _next) => {
  try{
     // 1. Determine status code
  const status =
    err?.response?.status ||  // Axios error
    err?.statusCode        || // Custom AppError or library error
    500;                      // Default fallback
  console.error(err?.response?.data,"\n");
  res.status(status).json({ error: err.message || 'Request failed'});
  }
  catch(e)
  {
    console.error(err, "\n");
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`API up on ${process.env.PORT || 3000}`)
);
