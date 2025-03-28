import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { categories } from '../data/games';
import * as Icons from 'lucide-react';
import { Logo } from './Logo';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const iconComponents = Icons as any;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName];
    
    if (IconComponent) {
      return <IconComponent className="w-5 h-5" />;
    } else {
      return <img src="/favicon.svg" alt="icon" className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <Logo className="w-8 h-8" />
              <span className="text-2xl font-bold text-white">YourGame</span>
            </Link>
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white sm:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
          <div className={`sm:col-span-2 ${isMobileMenuOpen ? 'block' : 'hidden sm:block'}`}>
            <nav className="space-y-2">
              {categories.map((category) => {
                const IconComponent = iconComponents[category.icon];
                return (
                  <Link
                    key={category.id}
                    to={category.id === 'all' ? '/' : `/category/${category.id}`}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === (category.id === 'all' ? '/' : `/category/${category.id}`)
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <main className="sm:col-span-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}