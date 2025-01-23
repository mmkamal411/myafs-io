import React, { useState } from 'react';
import { AlertTriangle, BarChart2, Clock, GitBranch, Shield } from 'lucide-react';

interface TechDebtItem {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'performance' | 'maintainability' | 'reliability';
  severity: 'critical' | 'high' | 'medium' | 'low';
  effort: number; // in days
  impact: 'high' | 'medium' | 'low';
  created: string;
  assignee?: string;
  status: 'identified' | 'in_progress' | 'resolved';
  service: string;
}

const techDebtItems: TechDebtItem[] = [
  {
    id: 'TD-1',
    title: 'Outdated Authentication Library',
    description: 'Current auth library has known vulnerabilities and needs to be upgraded',
    category: 'security',
    severity: 'critical',
    effort: 5,
    impact: 'high',
    created: '2024-03-10',
    assignee: 'Security Team',
    status: 'in_progress',
    service: 'auth-service'
  },
  {
    id: 'TD-2',
    title: 'Database Query Optimization',
    description: 'Inefficient queries causing high latency in production',
    category: 'performance',
    severity: 'high',
    effort: 3,
    impact: 'high',
    created: '2024-03-12',
    assignee: 'Database Team',
    status: 'identified',
    service: 'api-service'
  },
  {
    id: 'TD-3',
    title: 'Legacy Code Refactoring',
    description: 'Old monolithic code needs to be split into microservices',
    category: 'maintainability',
    severity: 'medium',
    effort: 15,
    impact: 'medium',
    created: '2024-03-08',
    status: 'identified',
    service: 'backend-service'
  }
];

const TechDebtPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredItems = techDebtItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;
    return matchesCategory && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-600';
      case 'high': return 'bg-orange-100 text-orange-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="w-5 h-5" />;
      case 'performance': return <BarChart2 className="w-5 h-5" />;
      case 'maintainability': return <GitBranch className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Technical Debt</h1>
            <p className="text-sm text-gray-600">Track and manage technical debt items</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Items', value: techDebtItems.length },
          { label: 'Critical Items', value: techDebtItems.filter(i => i.severity === 'critical').length },
          { label: 'In Progress', value: techDebtItems.filter(i => i.status === 'in_progress').length },
          { label: 'Total Effort', value: `${techDebtItems.reduce((acc, i) => acc + i.effort, 0)} days` }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm text-gray-600 mb-2">{metric.label}</h3>
            <span className="text-2xl font-semibold">{metric.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          <option value="all">All Categories</option>
          <option value="security">Security</option>
          <option value="performance">Performance</option>
          <option value="maintainability">Maintainability</option>
          <option value="reliability">Reliability</option>
        </select>
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tech Debt Items */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-gray-500">{item.id}</span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                </div>
                <div className={`p-2 rounded-lg ${
                  item.category === 'security' ? 'bg-red-100 text-red-600' :
                  item.category === 'performance' ? 'bg-blue-100 text-blue-600' :
                  item.category === 'maintainability' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {getCategoryIcon(item.category)}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-medium">{item.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Effort</p>
                  <p className="font-medium">{item.effort} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Impact</p>
                  <p className="font-medium capitalize">{item.impact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{new Date(item.created).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Status: <span className="font-medium capitalize">{item.status.replace('_', ' ')}</span>
                  </span>
                </div>
                <button className="px-4 py-2 bg-accent-gradient text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechDebtPage;