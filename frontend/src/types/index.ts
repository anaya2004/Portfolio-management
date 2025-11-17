// API Response Types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Project Types
export interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  projectName: string;
  projectDescription: string;
  image?: File;
}

// Client Types
export interface Client {
  id: string;
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  clientImage: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormData {
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  image?: File;
}

// Contact Types
export interface Contact {
  id: string;
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  city: string;
}

// Newsletter Types
export interface Newsletter {
  id: string;
  emailAddress: string;
  subscribedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterFormData {
  emailAddress: string;
}

// Statistics Types
export interface ContactStats {
  totalSubmissions: number;
  todaySubmissions: number;
  thisWeekSubmissions: number;
  topCities: Array<{
    city: string;
    submissions: number;
  }>;
}

export interface NewsletterStats {
  totalActive: number;
  totalUnsubscribed: number;
  todaySubscriptions: number;
  thisWeekSubscriptions: number;
}

// Form State Types
export interface FormState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

// Generic API Data Types
export interface ProjectsResponse {
  projects: Project[];
  count: number;
}

export interface ClientsResponse {
  clients: Client[];
  count: number;
}

export interface ContactsResponse {
  contacts: Contact[];
  count: number;
}

export interface NewsletterResponse {
  subscriptions: Newsletter[];
  count: number;
}

// UI State Types
export interface LoadingState {
  projects: boolean;
  clients: boolean;
  contacts: boolean;
  newsletter: boolean;
}

export interface ErrorState {
  projects: string | null;
  clients: string | null;
  contacts: string | null;
  newsletter: string | null;
}
