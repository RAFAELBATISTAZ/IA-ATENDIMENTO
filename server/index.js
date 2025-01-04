import express from 'express';
    import mongoose from 'mongoose';
    import dotenv from 'dotenv';
    import cors from 'cors';
    import authRoutes from './routes/auth.js';
    import stripeRoutes from './routes/stripe.js';

    dotenv.config();
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/stripe', stripeRoutes);

    // Database connection
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('MongoDB connection error:', err));

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
