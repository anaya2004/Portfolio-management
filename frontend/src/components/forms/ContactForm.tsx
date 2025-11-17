import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { config } from '../../config';

interface ContactFormData {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  city: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    emailAddress: '',
    mobileNumber: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${config.API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.');
        setFormData({ fullName: '', emailAddress: '', mobileNumber: '', city: '' });
      } else {
        alert('Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange('fullName')}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange('emailAddress')}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
                  <Input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleInputChange('mobileNumber')}
                    required
                    placeholder="Enter your mobile number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    required
                    placeholder="Enter your city"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
