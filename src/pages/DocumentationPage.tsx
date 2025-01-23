import React, { useState } from 'react';
import { Book, Search, ArrowRight, FileText, Users, Clock } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  author: string;
  readTime: string;
  articles: number;
}

const docSections: DocSection[] = [
  {
    id: '1',
    title: 'Getting Started',
    description: 'Learn the basics and get up to speed with our platform',
    category: 'Basics',
    lastUpdated: '2024-03-15',
    author: 'Platform Team',
    readTime: '10 min',
    articles: 5
  },
  {
    id: '2',
    title: 'Service Creation',
    description: 'Best practices for creating and managing services',
    category: 'Development',
    lastUpdated: '2024-03-14',
    author: 'Architecture Team',
    readTime: '15 min',
    articles: 8
  },
  {
    id: '3',
    title: 'Deployment Guide',
    description: 'Learn about our deployment process and tools',
    category: 'Operations',
    lastUpdated: '2024-03-13',
    author: 'DevOps Team',
    readTime: '20 min',
    articles: 12
  }
];

const popularArticles = [
  {
    title: 'Creating Your First Service',
    views: '2.5k',
    category: 'Getting Started'
  },
  {
    title: 'Authentication Setup Guide',
    views: '1.8k',
    category: 'Security'
  },
  {
    title: 'Deployment Best Practices',
    views: '1.2k',
    category: 'Operations'
  }
];

const DocumentationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = docSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-green-100 rounded-lg">
          <Book className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Documentation</h1>
          <p className="text-sm text-gray-600">Everything you need to know about our platform</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-2xl mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Documentation Sections */}
          <div className="space-y-6">
            {filteredSections.map((section) => (
              <div key={section.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-6">
                  <span className="text-xs font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
                    {section.category}
                  </span>
                  <h2 className="text-xl font-semibold mt-3 mb-2">{section.title}</h2>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{section.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{section.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{section.articles} articles</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4">
                  <button className="text-accent-600 hover:text-accent-700 font-medium inline-flex items-center gap-1">
                    Browse Section
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Articles */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">Popular Articles</h3>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-light-100 rounded-lg">
                    <FileText className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{article.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{article.category}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{article.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['API Reference', 'Tutorials', 'Best Practices', 'FAQs'].map((link, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-light-100 rounded-lg transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;