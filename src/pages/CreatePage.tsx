import React, { useState } from 'react';
import { PlusCircle, Search, ArrowRight, Box, GitBranch, Globe, Database, Cloud } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: React.ElementType;
  color: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: 'service',
    name: 'Service',
    description: 'Create a new backend service with a RESTful API',
    type: 'Backend',
    icon: Box,
    color: 'blue',
    tags: ['Recommended', 'Backend', 'API']
  },
  {
    id: 'website',
    name: 'Website',
    description: 'Create a new frontend application',
    type: 'Frontend',
    icon: Globe,
    color: 'purple',
    tags: ['Frontend', 'React']
  },
  {
    id: 'library',
    name: 'Library',
    description: 'Create a new shared library',
    type: 'Library',
    icon: GitBranch,
    color: 'green',
    tags: ['Library', 'Shared']
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Set up a new database instance',
    type: 'Infrastructure',
    icon: Database,
    color: 'amber',
    tags: ['Infrastructure', 'Data']
  },
  {
    id: 'api',
    name: 'API Gateway',
    description: 'Create a new API Gateway configuration',
    type: 'Infrastructure',
    icon: Cloud,
    color: 'rose',
    tags: ['Infrastructure', 'API']
  }
];

const categories = [
  'All',
  'Recommended',
  'Frontend',
  'Backend',
  'Infrastructure',
  'Library'
];

const CreatePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                          template.type === selectedCategory ||
                          template.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
      rose: { bg: 'bg-rose-100', text: 'text-rose-600' }
    };
    return colorMap[color];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-accent-100 rounded-lg">
          <PlusCircle className="w-6 h-6 text-accent-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="text-sm text-gray-600">Create new applications, services, and resources</p>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="mb-8 space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent-gradient text-white'
                  : 'bg-white text-gray-700 hover:bg-light-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          const colors = getColorClasses(template.color);
          
          return (
            <div
              key={template.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 p-4">
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-accent-gradient text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                  <span>Choose</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePage;