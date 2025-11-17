import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminNavigation } from '../components/admin/AdminNavigation';
import { Dashboard } from '../components/admin/Dashboard';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { ClientsManager } from '../components/admin/ClientsManager';
import { ContactsViewer } from '../components/admin/ContactsViewer';
import { NewsletterViewer } from '../components/admin/NewsletterViewer';

const AdminPanel: React.FC = () => {
  const navItems = [
    { path: '/admin', label: 'Dashboard', exact: true },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/clients', label: 'Clients' },
    { path: '/admin/contacts', label: 'Contacts' },
    { path: '/admin/newsletter', label: 'Newsletter' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation navItems={navItems} />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/clients" element={<ClientsManager />} />
          <Route path="/contacts" element={<ContactsViewer />} />
          <Route path="/newsletter" element={<NewsletterViewer />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;
