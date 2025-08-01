import express from 'express';
import { connectDB } from './utils/db';
import { config } from './config';
import router from './routes';

const app = express();

// Middleware
app.use(express.json());
// Database connection
connectDB();

// Routes
app.use('/api', router);

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
