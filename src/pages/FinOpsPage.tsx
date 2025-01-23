import React from 'react';
import { DollarSign, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';

const costMetrics = [
  {
    id: 1,
    name: 'Total Cloud Costs',
    value: '$45,678',
    change: '+12%',
    trend: 'up'
  },
  {
    id: 2,
    name: 'Software Licenses',
    value: '$12,345',
    change: '-5%',
    trend: 'down'
  },
  {
    id: 3,
    name: 'Infrastructure',
    value: '$28,900',
    change: '+8%',
    trend: 'up'
  },
  {
    id: 4,
    name: 'Development Tools',
    value: '$4,433',
    change: '0%',
    trend: 'neutral'
  }
];

const costAlerts = [
  {
    id: 1,
    service: 'AWS EC2',
    message: 'Usage spike detected',
    impact: '$1,200',
    severity: 'high'
  },
  {
    id: 2,
    service: 'Azure Storage',
    message: 'Approaching budget limit',
    impact: '$800',
    severity: 'medium'
  }
];

const FinOpsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-green-100 rounded-lg">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Cost Insights</h1>
          <p className="text-sm text-gray-600">Monitor and optimize your cloud spending</p>
        </div>
      </div>

      {/* Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {costMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm text-gray-600 mb-2">{metric.name}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-red-600' :
                metric.trend === 'down' ? 'text-green-600' :
                'text-gray-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cost Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Cost Alerts
        </h2>
        <div className="space-y-4">
          {costAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-medium">{alert.service}</h3>
                <p className="text-sm text-gray-600">{alert.message}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900">{alert.impact}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Cost Breakdown
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart placeholder - Add your preferred charting library
        </div>
      </div>
    </div>
  );
};

export default FinOpsPage;