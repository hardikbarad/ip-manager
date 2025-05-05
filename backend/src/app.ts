import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cmdbRoutes from './routes/cmdb.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/cmdb', cmdbRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;