import express from 'express';
import Newsletter from '../models/Newsletter';
import { validateRequest, newsletterValidationSchema } from '../middleware/validationMiddleware';

const router = express.Router();

// GET /api/newsletter - Get all newsletter subscriptions (for admin)
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Newsletter.find({})
      .sort({ subscribedAt: -1 })
      .select('-__v');

    return res.status(200).json({
      status: 'success',
      data: {
        subscriptions,
        count: subscriptions.length,
      },
    });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch newsletter subscriptions',
    });
  }
});

// GET /api/newsletter/stats - Get newsletter statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSubscriptions = await Newsletter.countDocuments({ isActive: true });
    const totalUnsubscribed = await Newsletter.countDocuments({ isActive: false });
    
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todaySubscriptions = await Newsletter.countDocuments({
      subscribedAt: { $gte: todayStart },
      isActive: true
    });

    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);
    
    const thisWeekSubscriptions = await Newsletter.countDocuments({
      subscribedAt: { $gte: thisWeekStart },
      isActive: true
    });

    return res.status(200).json({
      status: 'success',
      data: {
        totalActive: totalSubscriptions,
        totalUnsubscribed,
        todaySubscriptions,
        thisWeekSubscriptions,
      },
    });
  } catch (error) {
    console.error('Error fetching newsletter statistics:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch newsletter statistics',
    });
  }
});

// POST /api/newsletter/subscribe - Subscribe to newsletter (for public)
router.post(
  '/subscribe',
  validateRequest(newsletterValidationSchema),
  async (req, res) => {
    try {
      const { emailAddress } = req.body;

      // Check if email is already subscribed
      const existingSubscription = await Newsletter.findOne({ emailAddress });
      
      if (existingSubscription) {
        if (existingSubscription.isActive) {
          return res.status(400).json({
            status: 'error',
            message: 'This email address is already subscribed to our newsletter',
          });
        } else {
          // Reactivate subscription
          existingSubscription.isActive = true;
          existingSubscription.subscribedAt = new Date();
          await existingSubscription.save();
          
          return res.status(200).json({
            status: 'success',
            message: 'Welcome back! Your newsletter subscription has been reactivated.',
          });
        }
      }

      // Create new subscription
      const newSubscription = new Newsletter({
        emailAddress,
      });

      await newSubscription.save();

      return res.status(201).json({
        status: 'success',
        message: 'Thank you for subscribing to our newsletter!',
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      
      // Handle unique constraint error
      if ((error as any).name === 'MongoServerError' && (error as any).code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'This email address is already subscribed to our newsletter',
        });
      }
      
      return res.status(500).json({
        status: 'error',
        message: 'Failed to subscribe to newsletter. Please try again.',
      });
    }
  }
);

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post(
  '/unsubscribe',
  validateRequest(newsletterValidationSchema),
  async (req, res) => {
    try {
      const { emailAddress } = req.body;

      const subscription = await Newsletter.findOne({ emailAddress, isActive: true });
      
      if (!subscription) {
        return res.status(404).json({
          status: 'error',
          message: 'Email address not found in our newsletter subscriptions',
        });
      }

      subscription.isActive = false;
      await subscription.save();

      return res.status(200).json({
        status: 'success',
        message: 'You have been successfully unsubscribed from our newsletter',
      });
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to unsubscribe. Please try again.',
      });
    }
  }
);


export default router;
