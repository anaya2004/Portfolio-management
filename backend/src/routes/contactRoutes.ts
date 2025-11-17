import express from 'express';
import Contact from '../models/Contact';
import { validateRequest, contactValidationSchema } from '../middleware/validationMiddleware';

const router = express.Router();

// GET /api/contact - Get all contact form submissions (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({
      status: 'success',
      data: {
        contacts,
        count: contacts.length,
      },
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact submissions',
    });
  }
});

// GET /api/contact/:id - Get single contact submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact submission not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact submission',
    });
  }
});

// POST /api/contact - Submit contact form (for public)
router.post(
  '/',
  validateRequest(contactValidationSchema),
  async (req, res) => {
    try {
      const { fullName, emailAddress, mobileNumber, city } = req.body;

      // Create new contact submission
      const newContact = new Contact({
        fullName,
        emailAddress,
        mobileNumber,
        city,
      });

      const savedContact = await newContact.save();

      return res.status(201).json({
        status: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: {
          contact: savedContact,
        },
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to submit contact form. Please try again.',
      });
    }
  }
);

// GET /api/contact/stats/summary - Get contact form statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalSubmissions = await Contact.countDocuments();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todaySubmissions = await Contact.countDocuments({
      createdAt: { $gte: todayStart }
    });

    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);
    
    const thisWeekSubmissions = await Contact.countDocuments({
      createdAt: { $gte: thisWeekStart }
    });

    // Get submissions by city
    const submissionsByCity = await Contact.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        totalSubmissions,
        todaySubmissions,
        thisWeekSubmissions,
        topCities: submissionsByCity.map(item => ({
          city: item._id,
          submissions: item.count,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching contact statistics:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact statistics',
    });
  }
});

export default router;
