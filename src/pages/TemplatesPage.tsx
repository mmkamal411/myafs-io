import React, { useState } from 'react';
import { FileText, Plus, Search, Tags, GitBranch, Box } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  type: 'service' | 'website' | 'library' | 'api';
  language: string;
  framework: string;
  tags: string[];
  lastUpdated: string;
  stars: number;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'React Microservice',
    description: 'Production-ready React service with TypeScript, testing setup, and monitoring integration',
    type: 'service',
    language: 'TypeScript',
    framework: 'React',
    tags: ['frontend', 'microservice', 'typescript'],
    lastUpdated: '2024-03-15',
    stars: 245
  },
  {
    id: '2',
    name: 'Node.js API Service',
    description: 'RESTful API service with Express, OpenAPI documentation, and database integration',
    type: 'api',
    language: 'TypeScript',
    framework: 'Express',
    tags: ['backend', 'api', 'typescript'],
    lastUpdated: '2024-03-14',
    stars: 189
  },
  {
    id: '3',
    name: 'Python Data Pipeline',
    description: 'Data processing service with FastAPI and pandas integration',
    type: 'service',
    language: 'Python',
    framework: 'FastAPI',
    tags: ['data', 'pipeline', 'python'],
    lastUpdated: '2024-03-13',
    stars: 156
  }
];

const categories = [
  'All Templates',
  'Frontend Services',
  'Backend Services',
  'Full Stack',
  'Data Processing',
  'DevOps',
  'Security'
];

const TemplatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Templates');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Templates</h1>
            <p className="text-sm text-gray-600">Start new projects with production-ready templates</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white font-medium rounded-xl hover:shadow-md transition-all duration-300">
          <Plus className="w-5 h-5" />
          Create Template
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-thin scrollbar-thumb-light-300 scrollbar-track-transparent">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-accent-gradient text-white'
                : 'bg-white text-gray-700 hover:bg-light-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${
                  template.type === 'service' ? 'bg-blue-100 text-blue-600' :
                  template.type === 'website' ? 'bg-purple-100 text-purple-600' :
                  template.type === 'library' ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600">
                  {template.language}
                </span>
                <span className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600">
                  {template.framework}
                </span>
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  <span>{template.stars} stars</span>
                </div>
                <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4">
              <button className="w-full py-2 bg-accent-gradient text-white font-medium rounded-lg hover:shadow-md transition-all duration-300">
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;