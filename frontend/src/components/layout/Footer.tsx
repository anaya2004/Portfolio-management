import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { config } from '../../config';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section id="contact" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn more about our listing process, as well as our
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            additional staging and design work.
          </h2>
          
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 mb-16"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Real Line</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Transform your property dreams into reality with our comprehensive real estate solutions.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="hover:text-white">Property Sales</a></li>
                <li><a href="#" className="hover:text-white">Property Management</a></li>
                <li><a href="#" className="hover:text-white">Consultation</a></li>
                <li><a href="#" className="hover:text-white">Investment</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Projects</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-semibold mb-4">Subscribe to Newsletter</h4>
              <p className="text-blue-200 text-sm mb-4">
                Get the latest updates on our projects and services.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 mr-2 bg-white text-gray-800"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p className="text-blue-200 text-sm">
              &copy; 2025 Real Line. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
