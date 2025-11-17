import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  exact?: boolean;
}

interface AdminNavigationProps {
  navItems: NavItem[];
}

export const AdminNavigation: React.FC<AdminNavigationProps> = ({ navItems }) => {
  const location = useLocation();

  const isActive = (item: NavItem) => {
    return item.exact 
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Portfolio Manager
          </Link>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
