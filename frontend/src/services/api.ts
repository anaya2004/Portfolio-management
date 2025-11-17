import axios from 'axios';
import { config } from '../config';
import type {
  ApiResponse,
  Project,
  ProjectFormData,
  ProjectsResponse,
  Client,
  ClientFormData,
  ClientsResponse,
  Contact,
  ContactFormData,
  ContactsResponse,
  Newsletter,
  NewsletterFormData,
  NewsletterResponse,
  ContactStats,
  NewsletterStats,
} from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add any auth tokens if needed in future
api.interceptors.request.use(
  (config) => {
    // Add auth token here if implementing authentication later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// Project API Services
export const projectsApi = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<ApiResponse<ProjectsResponse>>('/projects');
    return response.data.data?.projects || [];
  },

  // Get single project
  getById: async (id: string): Promise<Project> => {
    const response = await api.get<ApiResponse<{ project: Project }>>(`/projects/${id}`);
    if (!response.data.data?.project) {
      throw new Error('Project not found');
    }
    return response.data.data.project;
  },

  // Create new project
  create: async (data: ProjectFormData): Promise<Project> => {
    const formData = new FormData();
    formData.append('projectName', data.projectName);
    formData.append('projectDescription', data.projectDescription);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post<ApiResponse<{ project: Project }>>('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.data?.project) {
      throw new Error('Failed to create project');
    }
    return response.data.data.project;
  }
};

// Client API Services
export const clientsApi = {
  // Get all clients
  getAll: async (): Promise<Client[]> => {
    const response = await api.get<ApiResponse<ClientsResponse>>('/clients');
    return response.data.data?.clients || [];
  },

  // Get single client
  getById: async (id: string): Promise<Client> => {
    const response = await api.get<ApiResponse<{ client: Client }>>(`/clients/${id}`);
    if (!response.data.data?.client) {
      throw new Error('Client not found');
    }
    return response.data.data.client;
  },

  // Create new client
  create: async (data: ClientFormData): Promise<Client> => {
    const formData = new FormData();
    formData.append('clientName', data.clientName);
    formData.append('clientDescription', data.clientDescription);
    formData.append('clientDesignation', data.clientDesignation);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post<ApiResponse<{ client: Client }>>('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.data?.client) {
      throw new Error('Failed to create client');
    }
    return response.data.data.client;
  }
};

// Contact API Services
export const contactsApi = {
  // Get all contact submissions (admin only)
  getAll: async (): Promise<Contact[]> => {
    const response = await api.get<ApiResponse<ContactsResponse>>('/contact');
    return response.data.data?.contacts || [];
  },

  // Submit contact form (public)
  submit: async (data: ContactFormData): Promise<Contact> => {
    const response = await api.post<ApiResponse<{ contact: Contact }>>('/contact', data);
    if (!response.data.data?.contact) {
      throw new Error('Failed to submit contact form');
    }
    return response.data.data.contact;
  },

  // Get contact statistics
  getStats: async (): Promise<ContactStats> => {
    const response = await api.get<ApiResponse<ContactStats>>('/contact/stats/summary');
    if (!response.data.data) {
      throw new Error('Failed to get contact statistics');
    }
    return response.data.data;
  }
};

// Newsletter API Services
export const newsletterApi = {
  // Get all newsletter subscriptions (admin only)
  getAll: async (): Promise<Newsletter[]> => {
    const response = await api.get<ApiResponse<NewsletterResponse>>('/newsletter');
    return response.data.data?.subscriptions || [];
  },

  // Subscribe to newsletter (public)
  subscribe: async (data: NewsletterFormData): Promise<void> => {
    await api.post('/newsletter/subscribe', data);
  },

  // Unsubscribe from newsletter
  unsubscribe: async (data: NewsletterFormData): Promise<void> => {
    await api.post('/newsletter/unsubscribe', data);
  },

  // Get newsletter statistics
  getStats: async (): Promise<NewsletterStats> => {
    const response = await api.get<ApiResponse<NewsletterStats>>('/newsletter/stats');
    if (!response.data.data) {
      throw new Error('Failed to get newsletter statistics');
    }
    return response.data.data;
  }
};

// Export default api instance for custom requests
export default api;
