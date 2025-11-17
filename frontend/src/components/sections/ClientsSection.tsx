import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Client {
  id: string;
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  clientImage: string;
  imageUrl: string;
}

interface ClientsSectionProps {
  clients: Client[];
  loading: boolean;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ clients, loading }) => {
  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  const renderClients = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {clients.map((client) => (
        <div key={client.id} className="text-center">
          {/* Profile Image */}
          <div className="mb-4">
            <img 
              src={client.imageUrl} 
              alt={client.clientName}
              className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          </div>
          
          {/* Testimonial Text */}
          <p className="text-gray-600 text-sm italic mb-4 leading-relaxed">
            "{client.clientDescription}"
          </p>
          
          {/* Client Info */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm">{client.clientName}</h4>
            <p className="text-blue-600 text-xs font-semibold">{client.clientDesignation}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">No client testimonials yet. Be our first!</p>
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-blue-500 font-semibold">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Happy Clients
          </h2>
        </div>
        
        {loading 
          ? renderLoadingSkeletons()
          : clients.length > 0 
            ? renderClients() 
            : renderEmptyState()
        }
      </div>
    </section>
  );
};
