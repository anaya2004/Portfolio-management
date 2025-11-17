import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface DashboardCardProps {
  to: string;
  title: string;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ to, title, description }) => (
  <Link to={to}>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export const Dashboard: React.FC = () => {
  const dashboardItems = [
    {
      to: '/admin/projects',
      title: 'Projects',
      description: 'Manage portfolio projects'
    },
    {
      to: '/admin/clients',
      title: 'Clients',
      description: 'Manage client testimonials'
    },
    {
      to: '/admin/contacts',
      title: 'Contacts',
      description: 'View contact submissions'
    },
    {
      to: '/admin/newsletter',
      title: 'Newsletter',
      description: 'View subscribers'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <DashboardCard key={item.to} {...item} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Admin Panel</CardTitle>
          <CardDescription>
            Manage your portfolio content, view submissions, and track engagement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Use the navigation above to manage different sections of your portfolio website.
            You can add, edit, and delete projects and client testimonials, as well as view 
            contact form submissions and newsletter subscribers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
