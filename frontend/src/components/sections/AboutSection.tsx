import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            We are a specialized real estate company that combines consultation, design, and marketing 
            to deliver comprehensive property solutions. Our team of experienced professionals works 
            closely with clients to understand their unique needs and help them achieve their real 
            estate goals. With years of experience in the industry, we have established ourselves as 
            a trusted partner for property buyers, sellers, and investors alike.
          </p>
          
          <div className="mt-12">
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
