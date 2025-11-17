import express from 'express';
import Client from '../models/Client';
import { uploadSingleImage, handleUploadError } from '../middleware/uploadMiddleware';
import { validateRequest, clientValidationSchema } from '../middleware/validationMiddleware';
import { ImageProcessor } from '../utils/imageProcessor';
import { config } from '../config';

const router = express.Router();

// GET /api/clients - Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({
      status: 'success',
      data: {
        clients,
        count: clients.length,
      },
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch clients',
    });
  }
});

// GET /api/clients/:id - Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).select('-__v');
    
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        client,
      },
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch client',
    });
  }
});

// POST /api/clients - Create new client
router.post(
  '/',
  uploadSingleImage,
  handleUploadError,
  validateRequest(clientValidationSchema),
  async (req : any, res : any) => {
    try {
      const { clientName, clientDescription, clientDesignation } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          status: 'error',
          message: 'Client image is required',
        });
      }

      // Process and save image
      const processedImage = await ImageProcessor.processImage(
        file.buffer,
        file.originalname,
        'clients',
        {
          width: config.CLIENT_IMAGE_WIDTH,
          height: config.CLIENT_IMAGE_HEIGHT,
        }
      );

      // Create client
      const newClient = new Client({
        clientName,
        clientDescription,
        clientDesignation,
        clientImage: processedImage.filename,
      });

      const savedClient = await newClient.save();

      return res.status(201).json({
        status: 'success',
        message: 'Client created successfully',
        data: {
          client: savedClient,
        },
      });
    } catch (error) {
      console.error('Error creating client:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create client',
      });
    }
  }
);

export default router;
