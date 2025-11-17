import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { config } from '../../config';

interface Newsletter {
  id: string;
  emailAddress: string;
  isActive: boolean;
  subscribedAt: string;
  createdAt?: string;
}

export const NewsletterViewer: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/newsletter`);
      const data = await response.json();      
      const newslettersData = data.data?.subscriptions || [];
      setNewsletters(newslettersData);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading newsletter subscriptions...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Newsletter Subscriptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsletters.length > 0 ? (
          newsletters.map((newsletter) => (
            <Card key={newsletter.id}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="font-medium">{newsletter.emailAddress}</p>
                  <div className="flex justify-between items-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      newsletter.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {newsletter.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <p className="text-xs text-gray-500">
                      {new Date(newsletter.subscribedAt || newsletter.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No newsletter subscriptions yet.
          </div>
        )}
      </div>
    </div>
  );
};
