import React, { useState } from 'react';
import { Database, Table, Plus, Search, Shield, Activity } from 'lucide-react';

interface DatabaseInstance {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'warning' | 'error';
  size: string;
  connections: number;
  lastBackup: string;
  region: string;
}

const databases: DatabaseInstance[] = [
  {
    id: '1',
    name: 'users-db-prod',
    type: 'PostgreSQL',
    status: 'healthy',
    size: '256 GB',
    connections: 125,
    lastBackup: '2024-03-15T10:00:00Z',
    region: 'us-west-2'
  },
  {
    id: '2',
    name: 'analytics-db',
    type: 'MongoDB',
    status: 'warning',
    size: '512 GB',
    connections: 45,
    lastBackup: '2024-03-15T08:30:00Z',
    region: 'us-east-1'
  },
  {
    id: '3',
    name: 'cache-db',
    type: 'Redis',
    status: 'healthy',
    size: '64 GB',
    connections: 256,
    lastBackup: '2024-03-15T09:15:00Z',
    region: 'us-west-2'
  }
];

const DatabasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDatabases = databases.filter(db =>
    db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    db.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Database className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Database Management</h1>
            <p className="text-sm text-gray-600">Monitor and manage your databases</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white font-medium rounded-xl hover:shadow-md transition-all duration-300">
          <Plus className="w-5 h-5" />
          New Database
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search databases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>

      {/* Database List */}
      <div className="space-y-6">
        {filteredDatabases.map((db) => (
          <div key={db.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{db.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    db.status === 'healthy' ? 'bg-green-100 text-green-600' :
                    db.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {db.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>{db.type}</span>
                  <span>•</span>
                  <span>{db.region}</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-light-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Size</div>
                <div className="font-semibold">{db.size}</div>
              </div>
              <div className="p-4 bg-light-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Active Connections</div>
                <div className="font-semibold">{db.connections}</div>
              </div>
              <div className="p-4 bg-light-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Last Backup</div>
                <div className="font-semibold">
                  {new Date(db.lastBackup).toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-light-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Tables</div>
                <div className="font-semibold flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  <span>24 tables</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabasePage;