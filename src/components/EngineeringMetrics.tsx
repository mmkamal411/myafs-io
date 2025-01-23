import React from 'react';
import { 
  GitPullRequest, GitMerge, GitCommit, AlertTriangle,
  TrendingUp, BarChart2, CheckCircle2, Clock
} from 'lucide-react';

interface EngineeringMetricsProps {
  timeRange: string;
}

// Mock data for pull requests
const pullRequests = [
  {
    id: 1,
    title: 'Implement OAuth2 Authentication',
    author: 'Sarah Chen',
    createdAt: '2024-03-10T10:00:00Z',
    status: 'needs_review',
    reviewers: ['John Doe', 'Alice Smith'],
    branch: 'feature/oauth-auth'
  },
  {
    id: 2,
    title: 'Optimize Database Queries',
    author: 'Mike Johnson',
    createdAt: '2024-03-12T15:30:00Z',
    status: 'approved',
    reviewers: ['Bob Wilson'],
    branch: 'fix/db-optimization'
  },
  {
    id: 3,
    title: 'Add E2E Tests for Payment Flow',
    author: 'Emma Davis',
    createdAt: '2024-03-14T09:15:00Z',
    status: 'changes_requested',
    reviewers: ['Sarah Chen', 'John Doe'],
    branch: 'test/payment-e2e'
  }
];

// Mock data for deployments
const deployments = [
  {
    id: 1,
    environment: 'production',
    status: 'failed',
    timestamp: '2024-03-15T11:30:00Z',
    cause: 'Database migration timeout',
    service: 'payment-service'
  },
  {
    id: 2,
    environment: 'staging',
    status: 'failed',
    timestamp: '2024-03-14T16:45:00Z',
    cause: 'Invalid configuration',
    service: 'auth-service'
  }
];

// Mock data for sprint metrics
const sprintMetrics = {
  velocity: [
    { sprint: 'Sprint 18', points: 42 },
    { sprint: 'Sprint 19', points: 38 },
    { sprint: 'Sprint 20', points: 45 },
    { sprint: 'Sprint 21', points: 41 },
    { sprint: 'Sprint 22', points: 44 },
    { sprint: 'Sprint 23', points: 47 }
  ],
  coverage: {
    frontend: 87,
    backend: 92,
    'payment-service': 85,
    'auth-service': 89
  },
  mttr: {
    p0: 2.5,
    p1: 4.8,
    p2: 12.4
  }
};

const EngineeringMetrics: React.FC<EngineeringMetricsProps> = ({ timeRange }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <GitMerge className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Target: &gt;95%</span>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">PR Success Rate</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold">96.8%</span>
            <span className="text-sm text-green-600">+2.1%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GitCommit className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Daily Avg</span>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Deployment Frequency</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold">4.2</span>
            <span className="text-sm text-blue-600">+0.5</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Hours</span>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Review Time</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold">8.5</span>
            <span className="text-sm text-red-600">+1.2</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Target: 99%</span>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Release Success</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold">99.2%</span>
            <span className="text-sm text-green-600">+0.3%</span>
          </div>
        </div>
      </div>

      {/* Pull Requests */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <GitPullRequest className="w-5 h-5" />
            Open Pull Requests
          </h2>
          <button className="text-accent-600 hover:text-accent-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {pullRequests.map((pr) => (
            <div key={pr.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{pr.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pr.status === 'approved' ? 'bg-green-100 text-green-600' :
                    pr.status === 'changes_requested' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {pr.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>by {pr.author}</span>
                  <span>•</span>
                  <span>{new Date(pr.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {pr.reviewers.map((reviewer, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                      title={reviewer}
                    >
                      {reviewer.charAt(0)}
                    </div>
                  ))}
                </div>
                <button className="text-accent-600 hover:text-accent-700">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Deployments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Failed Deployments
          </h2>
        </div>

        <div className="space-y-4">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
              <div>
                <h3 className="font-medium">{deployment.service}</h3>
                <p className="text-sm text-red-600 mt-1">{deployment.cause}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">{deployment.environment}</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">
                    {new Date(deployment.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-accent-gradient text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-300">
                Investigate
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sprint Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Sprint Velocity
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Velocity Chart placeholder
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {sprintMetrics.velocity.slice(-3).map((sprint, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-600">{sprint.sprint}</div>
                <div className="font-semibold mt-1">{sprint.points} pts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Coverage */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Code Coverage
          </h2>
          <div className="space-y-4">
            {Object.entries(sprintMetrics.coverage).map(([component, coverage]) => (
              <div key={component}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">{component}</span>
                  <span className="font-medium">{coverage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-gradient rounded-full transition-all duration-300"
                    style={{ width: `${coverage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringMetrics;