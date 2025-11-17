import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { config } from '../../config';

export const Header: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    project: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          emailAddress: formData.email,
          mobileNumber: formData.mobile,
          city: formData.project
        })
      });
      
      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        setFormData({ fullName: '', email: '', mobile: '', project: '' });
      } else {
        const errorData = await response.json();
        console.error('Contact form error:', errorData);
        
        // Show specific validation errors
        if (errorData.errors && errorData.errors.length > 0) {
          const errorMessages = errorData.errors.map((err: any) => `• ${err.message}`).join('\n');
          alert(`Please fix the following errors:\n\n${errorMessages}`);
        } else {
          alert(`Error: ${errorData.message || 'Failed to submit form. Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check if the server is running and try again.');
    }
  };

  return (
    <section id="home" className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')",
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Consultation,<br />
              Design,<br />
              <span className="text-orange-400">& Marketing</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg">
              Transform your property dreams into reality with our comprehensive real estate solutions.
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Learn More
            </Button>
          </div>

          <div className="bg-blue-900 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-2">Get a Free</h3>
            <h3 className="text-2xl font-bold mb-6">Consultation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="bg-white text-gray-800"
                required
              />
              <Input
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white text-gray-800"
                required
              />
              <Input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="bg-white text-gray-800"
                required
              />
              <Input
                placeholder="Project/City"
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
                className="bg-white text-gray-800"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              >
                Get My Free Consultation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
