import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { config } from '../../config';

interface Contact {
  id: string;
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  city: string;
  createdAt: string;
}

export const ContactsViewer: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/contact`);
      const data = await response.json();
      setContacts(data.data?.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading contact submissions...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>

      <div className="space-y-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{contact.fullName}</h3>
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-medium">Email:</span> {contact.emailAddress}</p>
                      <p className="text-sm"><span className="font-medium">Mobile:</span> {contact.mobileNumber}</p>
                      <p className="text-sm"><span className="font-medium">City:</span> {contact.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No contact submissions yet.
          </div>
        )}
      </div>
    </div>
  );
};
