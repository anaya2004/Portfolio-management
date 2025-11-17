import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { config } from '../../config';

interface Client {
  id: string;
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  clientImage: string;
  imageUrl: string;
}

interface ClientFormData {
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  clientImage: File | null;
}

const ClientForm: React.FC<{ onSubmit: (data: ClientFormData) => Promise<void> }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    clientName: '',
    clientDescription: '',
    clientDesignation: '',
    clientImage: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Clear form on successful submission
      setFormData({ clientName: '', clientDescription: '', clientDesignation: '', clientImage: null });
    } catch (error) {
      // Keep form data intact if there's an error
      console.error('Form submission error:', error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Client</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Client Name</label>
            <Input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              required
              placeholder="Enter client name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Client Description/Testimonial</label>
            <Input
              type="text"
              value={formData.clientDescription}
              onChange={(e) => setFormData({...formData, clientDescription: e.target.value})}
              required
              placeholder="Enter client testimonial or description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Client Designation</label>
            <Input
              type="text"
              value={formData.clientDesignation}
              onChange={(e) => setFormData({...formData, clientDesignation: e.target.value})}
              required
              placeholder="e.g., CEO, Web Developer, Designer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Client Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, clientImage: e.target.files?.[0] || null})}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">Add Client</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ClientCard: React.FC<{ client: Client }> = ({ client }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <img src={client.imageUrl} alt={client.clientName} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="font-semibold mb-1">{client.clientName}</h3>
      <p className="text-sm text-blue-600 mb-2">{client.clientDesignation}</p>
      <p className="text-sm text-gray-600 italic">"{client.clientDescription}"</p>
    </CardContent>
  </Card>
);

export const ClientsManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/clients`);
      const data = await response.json();
      setClients(data.data?.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: ClientFormData) => {
    const formDataToSend = new FormData();
    formDataToSend.append('clientName', formData.clientName);
    formDataToSend.append('clientDescription', formData.clientDescription);
    formDataToSend.append('clientDesignation', formData.clientDesignation);
    if (formData.clientImage) {
      formDataToSend.append('image', formData.clientImage);
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/clients`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Client added successfully!');
        fetchClients();
      } else {
        const errorData = await response.json();
        console.error('Client save error:', errorData);
        
        if (errorData.errors && errorData.errors.length > 0) {
          const errorMessages = errorData.errors.map((err: any) => `• ${err.message}`).join('\n');
          alert(`Please fix the following errors:\n\n${errorMessages}`);
        } else {
          alert(`Error: ${errorData.message || 'Failed to add client. Please try again.'}`);
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
    return <div className="p-6">Loading clients...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Client Management</h2>

      <ClientForm onSubmit={handleSubmit} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No clients found. Add your first client!
        </div>
      )}
    </div>
  );
};
