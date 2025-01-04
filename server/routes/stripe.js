import express from 'express';
    import Stripe from 'stripe';
    import User from '../models/User.js';
    import dotenv from 'dotenv';

    dotenv.config();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const router = express.Router();

    // Create subscription
    router.post('/create-subscription', async (req, res) => {
      try {
        const { email, paymentMethodId } = req.body;
        const user = await User.findOne({ email });
        
        const customer = await stripe.customers.create({
          email,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: process.env.STRIPE_PRICE_ID }],
          expand: ['latest_invoice.payment_intent'],
        });

        user.stripeCustomerId = customer.id;
        user.subscriptionId = subscription.id;
        await user.save();

        res.json({ subscription });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    export default router;
