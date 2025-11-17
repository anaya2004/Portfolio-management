import React from 'react';

export const RealtorSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-500 font-semibold">REAL ESTATE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Not Your Average Realtor
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Real estate prices continue to increase across the United States. The demand for housing significantly exceeds the supply in every major city across the US because of rapid job growth and population influx.
            </p>
            
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Learn More
            </button>
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large circular image */}
              <div className="col-span-2 flex justify-center mb-4">
                <div className="w-48 h-48 bg-blue-100 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces" 
                    alt="Real Estate Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Two smaller circular images - Happy Clients */}
              <div className="flex justify-end">
                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop&crop=faces" 
                    alt="Happy Client 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces" 
                    alt="Happy Client 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Orange dot decoration */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
