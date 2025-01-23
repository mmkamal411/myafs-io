import React, { useState } from 'react';
import { Globe, Plus, Activity, Shield, Clock, ArrowRight } from 'lucide-react';

interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'deprecated';
  latency: string;
  requests: number;
  errorRate: string;
  lastUpdated: string;
}

const endpoints: ApiEndpoint[] = [
  {
    id: '1',
    path: '/api/v1/users',
    method: 'GET',
    status: 'active',
    latency: '45ms',
    requests: 1250,
    errorRate: '0.1%',
    lastUpdated: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    path: '/api/v1/auth',
    method: 'POST',
    status: 'active',
    latency: '120ms',
    requests: 850,
    errorRate: '0.5%',
    lastUpdated: '2024-03-15T09:30:00Z'
  },
  {
    id: '3',
    path: '/api/v1/products',
    method: 'GET',
    status: 'deprecated',
    latency: '65ms',
    requests: 450,
    errorRate: '1.2%',
    lastUpdated: '2024-03-14T16:45:00Z'
  }
];

const ApiGatewayPage = () => {
  const [activeTab, setActiveTab] = useState('endpoints');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lime-100 rounded-lg">
            <Globe className="w-6 h-6 text-lime-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">API Gateway</h1>
            <p className="text-sm text-gray-600">Manage and monitor your API endpoints</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white font-medium rounded-xl hover:shadow-md transition-all duration-300">
          <Plus className="w-5 h-5" />
          New Endpoint
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Requests', value: '2.5K', change: '+12%' },
          { label: 'Avg. Latency', value: '76ms', change: '-5%' },
          { label: 'Error Rate', value: '0.6%', change: '+0.1%' },
          { label: 'Active Endpoints', value: '8', change: '0' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm text-gray-600 mb-2">{metric.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Endpoints List */}
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div key={endpoint.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    endpoint.method === 'GET' ? 'bg-blue-100 text-blue-600' :
                    endpoint.method === 'POST' ? 'bg-green-100 text-green-600' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {endpoint.method}
                  </span>
                  <h3 className="text-lg font-mono">{endpoint.path}</h3>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    endpoint.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {endpoint.status}
                  </span>
                  <span className="text-sm text-gray-600">
                    Last updated: {new Date(endpoint.lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:bg-light-100 rounded-lg transition-colors">
                  <Shield className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-light-100 rounded-lg transition-colors">
                  <Activity className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Latency: {endpoint.latency}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{endpoint.requests} requests/hour</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Error Rate: {endpoint.errorRate}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-accent-600 hover:text-accent-700 text-sm font-medium inline-flex items-center gap-1">
                View Documentation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiGatewayPage;