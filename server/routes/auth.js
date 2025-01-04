import express from 'express';
    import jwt from 'jsonwebtoken';
    import User from '../models/User.js';
    import dotenv from 'dotenv';

    dotenv.config();
    const router = express.Router();

    // Register
    router.post('/register', async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        res.status(201).json({ token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Login
    router.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        res.json({ token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    export default router;
