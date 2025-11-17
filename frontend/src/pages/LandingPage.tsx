import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { RealtorSection } from '../components/sections/RealtorSection';
import { AboutSection } from '../components/sections/AboutSection';
import { WhyChooseSection } from '../components/sections/WhyChooseSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ClientsSection } from '../components/sections/ClientsSection';
import { usePortfolioData } from '../hooks/usePortfolioData';

const LandingPage: React.FC = () => {
  const { projects, clients, loading, error } = usePortfolioData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Header />
      <RealtorSection />
      <AboutSection />
      <WhyChooseSection />
      <ProjectsSection projects={projects} loading={loading} />
      <ClientsSection clients={clients} loading={loading} />
      <Footer />
    </div>
  );
};

export default LandingPage;
