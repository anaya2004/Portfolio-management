import React from 'react';
import { Card, CardContent } from '../ui/card';

export const WhyChooseSection: React.FC = () => {
  const features = [
    {
      icon: "🏠",
      title: "Potential ROI",
      description: "Maximize your investment returns with our data-driven market analysis and strategic property selection. We identify high-growth areas and emerging opportunities to ensure optimal profitability for your real estate portfolio."
    },
    {
      icon: "🎨", 
      title: "Design",
      description: "Transform spaces with our innovative design solutions that blend functionality with aesthetics. Our expert team creates stunning interiors and exteriors that enhance property value and appeal to target demographics."
    },
    {
      icon: "📈",
      title: "Marketing", 
      description: "Accelerate your property sales with our comprehensive digital marketing strategies. From professional photography to targeted social campaigns, we ensure maximum visibility and faster transactions in today's competitive market."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation Arrow */}
        <div className="text-center mt-12">
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
