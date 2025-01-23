import React, { useState } from 'react';
import { GitBranch, GitPullRequest, GitCommit, Plus, Users } from 'lucide-react';

interface Repository {
  id: string;
  name: string;
  description: string;
  branches: number;
  pullRequests: number;
  lastCommit: string;
  contributors: number;
  language: string;
}

const repositories: Repository[] = [
  {
    id: '1',
    name: 'frontend-app',
    description: 'Main frontend application repository',
    branches: 5,
    pullRequests: 3,
    lastCommit: '2024-03-15T10:30:00Z',
    contributors: 8,
    language: 'TypeScript'
  },
  {
    id: '2',
    name: 'api-service',
    description: 'Core API service repository',
    branches: 3,
    pullRequests: 2,
    lastCommit: '2024-03-15T09:15:00Z',
    contributors: 6,
    language: 'Go'
  },
  {
    id: '3',
    name: 'infrastructure',
    description: 'Infrastructure as Code repository',
    branches: 2,
    pullRequests: 1,
    lastCommit: '2024-03-14T16:45:00Z',
    contributors: 4,
    language: 'Terraform'
  }
];

const VersionControlPage = () => {
  const [activeTab, setActiveTab] = useState('repositories');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <GitBranch className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Version Control</h1>
            <p className="text-sm text-gray-600">Manage your code repositories</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white font-medium rounded-xl hover:shadow-md transition-all duration-300">
          <Plus className="w-5 h-5" />
          New Repository
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 rounded-xl bg-light-100 p-1 mb-8">
        <button
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
            activeTab === 'repositories'
              ? 'bg-white shadow text-accent-600'
              : 'text-light-600 hover:text-accent-600'
          }`}
          onClick={() => setActiveTab('repositories')}
        >
          <GitBranch className="w-4 h-4" />
          Repositories
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
            activeTab === 'pullRequests'
              ? 'bg-white shadow text-accent-600'
              : 'text-light-600 hover:text-accent-600'
          }`}
          onClick={() => setActiveTab('pullRequests')}
        >
          <GitPullRequest className="w-4 h-4" />
          Pull Requests
        </button>
      </div>

      {/* Repositories List */}
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{repo.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
              </div>
              <span className="px-3 py-1 bg-light-100 rounded-full text-sm font-medium text-gray-600">
                {repo.language}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                <span>{repo.branches} branches</span>
              </div>
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4" />
                <span>{repo.pullRequests} pull requests</span>
              </div>
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4" />
                <span>Last commit: {new Date(repo.lastCommit).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{repo.contributors} contributors</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionControlPage;