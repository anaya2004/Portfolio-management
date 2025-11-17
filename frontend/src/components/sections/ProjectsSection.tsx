import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  imageUrl: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading }) => {
  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <div className="h-48 bg-gray-300 rounded-t-lg"></div>
          <CardHeader>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
          <div className="relative">
            <img
              src={project.imageUrl}
              alt={project.projectName}
              className="w-full h-48 object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-800 mb-2">{project.projectName}</h3>
            <p className="text-sm text-gray-600 mb-3">{project.projectDescription}</p>
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white w-full"
            >
              Read more
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">No projects to display yet. Check back soon!</p>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Projects
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We know what buyers are looking for and suggest projects that will bring
            clients top dollar for the sale of their homes.
          </p>
        </div>

        {loading
          ? renderLoadingSkeletons()
          : projects.length > 0
            ? renderProjects()
            : renderEmptyState()
        }
      </div>
    </section>
  );
};
