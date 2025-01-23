import React from 'react';
import { Code, GitPullRequest, CheckCircle2, Users } from 'lucide-react';

interface CodeQualityMetricsProps {
  timeRange: string;
}

const mockData = {
  coverage: {
    overall: 87,
    trend: '+5%',
    components: {
      'Frontend': 89,
      'Backend API': 92,
      'Payment Service': 85,
      'Auth Service': 88
    }
  },
  technicalDebt: {
    score: 'A',
    issues: 156,
    trend: '-12%',
    breakdown: {
      'Code Smells': 89,
      'Bugs': 12,
      'Vulnerabilities': 5,
      'Security Hotspots': 50
    }
  },
  pullRequests: {
    averageCycleTime: '2.5 days',
    trend: '-8%',
    stages: {
      'Review': '1.2 days',
      'CI/CD': '0.8 days',
      'Deployment': '0.5 days'
    }
  },
  codeReview: {
    participationRate: 92,
    trend: '+3%',
    metrics: {
      'Average Comments': 8,
      'Average Reviewers': 2.5,
      'First Response Time': '4.2 hours'
    }
  }
};

const CodeQualityMetrics: React.FC<CodeQualityMetricsProps> = ({ timeRange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Code className="w-5 h-5" />
          Code Quality & Metrics
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Coverage */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Code Coverage</h3>
            <span className="text-sm text-green-600">{mockData.coverage.trend}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeDasharray={`${mockData.coverage.overall}, 100`}
                />
                <text x="18" y="20.35" className="text-xs font-medium" textAnchor="middle">
                  {mockData.coverage.overall}%
                </text>
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              {Object.entries(mockData.coverage.components).map(([component, value]) => (
                <div key={component}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{component}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-gradient rounded-full transition-all duration-300"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Debt */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Technical Debt</h3>
            <span className="text-sm text-green-600">{mockData.technicalDebt.trend}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-light-50 rounded-lg text-center">
              <div className="text-3xl font-semibold text-accent-600">
                {mockData.technicalDebt.score}
              </div>
              <div className="text-sm text-gray-600 mt-1">Quality Score</div>
            </div>
            <div className="p-4 bg-light-50 rounded-lg text-center">
              <div className="text-3xl font-semibold">
                {mockData.technicalDebt.issues}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Issues</div>
            </div>
          </div>
          <div className="space-y-2">
            {Object.entries(mockData.technicalDebt.breakdown).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{type}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pull Request Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Pull Request Cycle Time</h3>
            <span className="text-sm text-green-600">{mockData.pullRequests.trend}</span>
          </div>
          <div className="p-4 bg-light-50 rounded-lg text-center mb-4">
            <div className="text-3xl font-semibold">
              {mockData.pullRequests.averageCycleTime}
            </div>
            <div className="text-sm text-gray-600 mt-1">Average Cycle Time</div>
          </div>
          <div className="space-y-2">
            {Object.entries(mockData.pullRequests.stages).map(([stage, time]) => (
              <div key={stage} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{stage}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Review Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Code Review Participation</h3>
            <span className="text-sm text-green-600">{mockData.codeReview.trend}</span>
          </div>
          <div className="p-4 bg-light-50 rounded-lg text-center mb-4">
            <div className="text-3xl font-semibold">
              {mockData.codeReview.participationRate}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Team Participation Rate</div>
          </div>
          <div className="space-y-2">
            {Object.entries(mockData.codeReview.metrics).map(([metric, value]) => (
              <div key={metric} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{metric}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeQualityMetrics;