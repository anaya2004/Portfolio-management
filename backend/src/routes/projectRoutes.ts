import express from 'express';
import Project from '../models/Project';
import { uploadSingleImage, handleUploadError } from '../middleware/uploadMiddleware';
import { validateRequest, projectValidationSchema } from '../middleware/validationMiddleware';
import { ImageProcessor } from '../utils/imageProcessor';
import { config } from '../config';

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({
      status: 'success',
      data: {
        projects,
        count: projects.length,
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch projects',
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select('-__v');
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project',
    });
  }
});

// POST /api/projects - Create new project
router.post(
  '/',
  uploadSingleImage,
  handleUploadError,
  validateRequest(projectValidationSchema),
  async (req : any, res : any) => {
    try {
      const { projectName, projectDescription } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          status: 'error',
          message: 'Project image is required',
        });
      }

      // Process and save image
      const processedImage = await ImageProcessor.processImage(
        file.buffer,
        file.originalname,
        'projects',
        {
          width: config.PROJECT_IMAGE_WIDTH,
          height: config.PROJECT_IMAGE_HEIGHT,
        }
      );

      // Create project
      const newProject = new Project({
        projectName,
        projectDescription,
        projectImage: processedImage.filename,
      });

      const savedProject = await newProject.save();

      return res.status(201).json({
        status: 'success',
        message: 'Project created successfully',
        data: {
          project: savedProject,
        },
      });
    } catch (error) {
      console.error('Error creating project:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create project',
      });
    }
  }
);

export default router;
