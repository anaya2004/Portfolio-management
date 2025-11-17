import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { config } from '../../config';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${config.API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: email })
      });
      
      if (response.ok) {
        alert('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        alert('Sorry, there was an error with your subscription. Please try again.');
      }
    } catch (error) {
      alert('Sorry, there was an error with your subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to get the latest updates on our projects and services.
        </p>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="text-gray-900"
              disabled={isSubmitting}
            />
            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
