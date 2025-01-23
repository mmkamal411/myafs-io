import React, { useState } from 'react';
import { FileText, Search, Code, GitBranch, Shield } from 'lucide-react';

interface ApiDoc {
  id: string;
  title: string;
  version: string;
  category: 'rest' | 'graphql' | 'grpc' | 'websocket';
  status: 'stable' | 'beta' | 'deprecated';
  description: string;
  lastUpdated: string;
  endpoints?: {
    method: string;
    path: string;
    description: string;
  }[];
}

const apiDocs: ApiDoc[] = [
  {
    id: '1',
    title: 'User Authentication API',
    version: 'v2.0',
    category: 'rest',
    status: 'stable',
    description: 'Authentication and authorization endpoints',
    lastUpdated: '2024-03-15',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v2/auth/login',
        description: 'User login endpoint'
      },
      {
        method: 'POST',
        path: '/api/v2/auth/refresh',
        description: 'Refresh access token'
      }
    ]
  },
  {
    id: '2',
    title: 'Payment Processing API',
    version: 'v1.5',
    category: 'rest',
    status: 'stable',
    description: 'Payment processing and transaction management',
    lastUpdated: '2024-03-14',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/payments',
        description: 'Create new payment'
      },
      {
        method: 'GET',
        path: '/api/v1/payments/{id}',
        description: 'Get payment details'
      }
    ]
  },
  {
    id: '3',
    title: 'Real-time Events API',
    version: 'v1.0',
    category: 'websocket',
    status: 'beta',
    description: 'Real-time event streaming and notifications',
    lastUpdated: '2024-03-13'
  }
];

const ApiDocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDocs = apiDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">API Documentation</h1>
            <p className="text-sm text-gray-600">Explore and integrate with our APIs</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          <option value="all">All Categories</option>
          <option value="rest">REST APIs</option>
          <option value="graphql">GraphQL APIs</option>
          <option value="grpc">gRPC APIs</option>
          <option value="websocket">WebSocket APIs</option>
        </select>
      </div>

      {/* API List */}
      <div className="space-y-6">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    <span className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600">
                      {doc.version}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'stable' ? 'bg-green-100 text-green-600' :
                      doc.status === 'beta' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {doc.category === 'rest' && <Code className="w-5 h-5 text-blue-600" />}
                  {doc.category === 'graphql' && <GitBranch className="w-5 h-5 text-purple-600" />}
                  {doc.category === 'grpc' && <Shield className="w-5 h-5 text-green-600" />}
                  {doc.category === 'websocket' && <FileText className="w-5 h-5 text-orange-600" />}
                </div>
              </div>

              {doc.endpoints && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Endpoints</h4>
                  {doc.endpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-light-50 rounded-lg"
                    >
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-600' :
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-600' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                      <span className="text-sm text-gray-600">{endpoint.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
                <button className="px-4 py-2 bg-accent-gradient text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-300">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocsPage;