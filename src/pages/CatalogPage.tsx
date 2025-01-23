import React, { useState } from 'react';
import { Layers, Plus, Filter, ArrowUpDown, Tags, Users, Box, Search } from 'lucide-react';

interface CatalogItem {
  id: string;
  name: string;
  description: string;
  type: 'service' | 'website' | 'library' | 'api';
  owner: string;
  lifecycle: 'production' | 'development' | 'deprecated';
  tags: string[];
  system: string;
}

const catalogData: CatalogItem[] = [
  {
    id: '1',
    name: 'User Authentication Service',
    description: 'Handles user authentication and authorization across all platforms',
    type: 'service',
    owner: 'Platform Team',
    lifecycle: 'production',
    tags: ['auth', 'security', 'core'],
    system: 'Identity Management'
  },
  {
    id: '2',
    name: 'Payment Processing API',
    description: 'RESTful API for handling payment transactions',
    type: 'api',
    owner: 'Payments Team',
    lifecycle: 'production',
    tags: ['payments', 'api', 'core'],
    system: 'Financial Services'
  },
  {
    id: '3',
    name: 'UI Component Library',
    description: 'Shared React components following design system',
    type: 'library',
    owner: 'Frontend Team',
    lifecycle: 'development',
    tags: ['frontend', 'react', 'design-system'],
    system: 'Frontend Infrastructure'
  }
];

const CatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLifecycle, setSelectedLifecycle] = useState<string | null>(null);

  const filteredItems = catalogData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || item.type === selectedType;
    const matchesLifecycle = !selectedLifecycle || item.lifecycle === selectedLifecycle;
    return matchesSearch && matchesType && matchesLifecycle;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Service Catalog</h1>
            <p className="text-sm text-gray-600">Browse and manage all your software components</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white font-medium rounded-xl hover:shadow-md transition-all duration-300">
          <Plus className="w-5 h-5" />
          Register Component
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
        <div>
          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="">All Types</option>
            <option value="service">Services</option>
            <option value="website">Websites</option>
            <option value="library">Libraries</option>
            <option value="api">APIs</option>
          </select>
        </div>
        <div>
          <select
            value={selectedLifecycle || ''}
            onChange={(e) => setSelectedLifecycle(e.target.value || null)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="">All Lifecycles</option>
            <option value="production">Production</option>
            <option value="development">Development</option>
            <option value="deprecated">Deprecated</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    item.type === 'service' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'website' ? 'bg-purple-100 text-purple-600' :
                    item.type === 'library' ? 'bg-green-100 text-green-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{item.owner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tags className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.lifecycle === 'production' ? 'bg-green-100 text-green-600' :
                  item.lifecycle === 'development' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {item.lifecycle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;