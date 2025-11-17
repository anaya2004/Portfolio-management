import { useState, useEffect } from 'react';
import { config } from '../config';

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  imageUrl: string;
}

interface Client {
  id: string;
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  clientImage: string;
  imageUrl: string;
}

interface UsePortfolioDataReturn {
  projects: Project[];
  clients: Client[];
  loading: boolean;
  error: string | null;
  refetchProjects: () => void;
  refetchClients: () => void;
}

export const usePortfolioData = (): UsePortfolioDataReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/projects`);
      const data = await response.json();
      setProjects(data.data?.projects || []);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/clients`);
      const data = await response.json();
      setClients(data.data?.clients || []);
    } catch (err) {
      setError('Failed to fetch clients');
      console.error('Error fetching clients:', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([fetchProjects(), fetchClients()]);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    projects,
    clients,
    loading,
    error,
    refetchProjects: fetchProjects,
    refetchClients: fetchClients
  };
};
