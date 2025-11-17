import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { config } from '../../config';

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  imageUrl: string;
}

interface ProjectFormData {
  projectName: string;
  projectDescription: string;
  projectImage: File | null;
}

const ProjectForm: React.FC<{ onSubmit: (data: ProjectFormData) => Promise<void> }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    projectDescription: '',
    projectImage: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ projectName: '', projectDescription: '', projectImage: null });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <Input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              required
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Description</label>
            <Input
              type="text"
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              required
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, projectImage: e.target.files?.[0] || null })}
              required
            />
          </div>

          <Button type="submit" className="w-full">Add Project</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card>
    <img src={project.imageUrl} alt={project.projectName} className="w-full h-48 object-cover" />
    <CardContent className="p-4">
      <h3 className="font-semibold mb-2">{project.projectName}</h3>
      <p className="text-sm text-gray-600">{project.projectDescription}</p>
    </CardContent>
  </Card>
);

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/projects`);
      const data = await response.json();
      setProjects(data.data?.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: ProjectFormData) => {
    const formDataToSend = new FormData();
    formDataToSend.append('projectName', formData.projectName);
    formDataToSend.append('projectDescription', formData.projectDescription);
    if (formData.projectImage) {
      formDataToSend.append('image', formData.projectImage);
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/projects`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Project added successfully!');
        fetchProjects();
      } else {
        const errorData = await response.json();
        console.error('Project save error:', errorData);

        if (errorData.errors && errorData.errors.length > 0) {
          const errorMessages = errorData.errors.map((err: any) => `• ${err.message}`).join('\n');
          alert(`Please fix the following errors:\n\n${errorMessages}`);
        } else {
          alert(`Error: ${errorData.message || 'Failed to add project. Please try again.'}`);
        }
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check if the server is running and try again.');
      throw error;
    }
  };

  if (loading) {
    return <div className="p-6">Loading projects...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Project Management</h2>

      <ProjectForm onSubmit={handleSubmit} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No projects found. Add your first project!
        </div>
      )}
    </div>
  );
};
