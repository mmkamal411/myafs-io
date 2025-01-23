import React, { useState } from 'react';
import { Rocket, GitBranch, Clock, CheckCircle2, XCircle, AlertTriangle, Activity } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  stage: string;
  branch: string;
  commit: string;
  author: string;
  duration: string;
  timestamp: string;
  steps: {
    name: string;
    status: 'success' | 'failed' | 'running' | 'pending';
    duration: string;
  }[];
}

const pipelines: Pipeline[] = [
  {
    id: '1',
    name: 'frontend-app',
    status: 'running',
    stage: 'Test',
    branch: 'main',
    commit: 'feat: Add user authentication',
    author: 'John Doe',
    duration: '5m 30s',
    timestamp: '2024-03-15T12:00:00Z',
    steps: [
      { name: 'Build', status: 'success', duration: '2m 15s' },
      { name: 'Test', status: 'running', duration: '3m 15s' },
      { name: 'Security Scan', status: 'pending', duration: '-' },
      { name: 'Deploy', status: 'pending', duration: '-' }
    ]
  },
  {
    id: '2',
    name: 'api-service',
    status: 'success',
    stage: 'Deployed',
    branch: 'develop',
    commit: 'fix: API response handling',
    author: 'Jane Smith',
    duration: '8m 45s',
    timestamp: '2024-03-15T11:30:00Z',
    steps: [
      { name: 'Build', status: 'success', duration: '3m 20s' },
      { name: 'Test', status: 'success', duration: '4m 15s' },
      { name: 'Security Scan', status: 'success', duration: '1m 10s' },
      { name: 'Deploy', status: 'success', duration: '2m 00s' }
    ]
  }
];

const DeployPage = () => {
  const [activeTab, setActiveTab] = useState('pipelines');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'failed': return 'bg-red-100 text-red-600';
      case 'running': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'running': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Rocket className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">CI/CD Pipelines</h1>
            <p className="text-sm text-gray-600">Monitor and manage your deployment pipelines</p>
          </div>
        </div>
      </div>

      {/* Pipeline List */}
      <div className="space-y-6">
        {pipelines.map((pipeline) => (
          <div key={pipeline.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Pipeline Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{pipeline.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(pipeline.status)}`}>
                      {getStatusIcon(pipeline.status)}
                      {pipeline.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-4 h-4" />
                      {pipeline.branch}
                    </div>
                    <span>{pipeline.commit}</span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>{pipeline.duration}</div>
                  <div>{new Date(pipeline.timestamp).toLocaleString()}</div>
                </div>
              </div>

              {/* Pipeline Steps */}
              <div className="relative">
                <div className="absolute top-3 left-[19px] h-[calc(100%-24px)] w-0.5 bg-gray-200" />
                <div className="space-y-4">
                  {pipeline.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{step.name}</span>
                          <span className="text-sm text-gray-600">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pipeline Actions */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-center justify-end gap-3">
                <button className="px-4 py-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors">
                  View Logs
                </button>
                <button className="px-4 py-2 bg-accent-gradient text-white font-medium rounded-lg hover:shadow-md transition-all duration-300">
                  Redeploy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeployPage;