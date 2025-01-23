import React from 'react';
import { Activity, Clock, AlertCircle, Globe } from 'lucide-react';

interface SystemHealthProps {
  timeRange: string;
}

const mockData = {
  availability: {
    current: 99.98,
    target: 99.95,
    trend: '+0.01%',
    history: [99.95, 99.96, 99.97, 99.98, 99.98, 99.98, 99.97, 99.98]
  },
  errorBudget: {
    remaining: 82,
    burned: 18,
    burnRate: 0.8,
    daysLeft: 25
  },
  responseTime: {
    p50: 125,
    p90: 235,
    p99: 450,
    trend: '-12%'
  },
  regions: [
    { name: 'US East', latency: 125, availability: 99.99 },
    { name: 'US West', latency: 185, availability: 99.98 },
    { name: 'EU West', latency: 215, availability: 99.97 },
    { name: 'Asia Pacific', latency: 285, availability: 99.95 }
  ]
};

const SystemHealth: React.FC<SystemHealthProps> = ({ timeRange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Health
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Availability */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Service Availability</h3>
            <span className="text-sm text-green-600">{mockData.availability.trend}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-semibold">{mockData.availability.current}%</span>
              <span className="text-sm text-gray-600 ml-2">vs target {mockData.availability.target}%</span>
            </div>
          </div>
          <div className="h-16 flex items-end gap-1">
            {mockData.availability.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-green-100 rounded-t"
                style={{ height: `${((value - 99.9) / 0.1) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Error Budget */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Error Budget</h3>
            <span className="text-sm text-gray-600">{mockData.errorBudget.daysLeft} days left</span>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
                  {mockData.errorBudget.remaining}% Remaining
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-100">
                  {mockData.errorBudget.burned}% Burned
                </span>
              </div>
            </div>
            <div className="flex h-2 mb-4 overflow-hidden bg-gray-100 rounded">
              <div
                style={{ width: `${mockData.errorBudget.remaining}%` }}
                className="bg-green-500"
              />
              <div
                style={{ width: `${mockData.errorBudget.burned}%` }}
                className="bg-red-500"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Current burn rate: {mockData.errorBudget.burnRate}x
          </div>
        </div>

        {/* Response Time */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Response Time</h3>
            <span className="text-sm text-green-600">{mockData.responseTime.trend}</span>
          </div>
          <div className="space-y-2">
            {Object.entries(mockData.responseTime)
              .filter(([key]) => key.startsWith('p'))
              .map(([percentile, value]) => (
                <div key={percentile} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">p{percentile.slice(1)}</span>
                  <span className="font-medium">{value}ms</span>
                </div>
              ))}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="space-y-4">
          <h3 className="font-medium">Regional Performance</h3>
          <div className="space-y-3">
            {mockData.regions.map((region) => (
              <div key={region.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{region.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{region.latency}ms</span>
                  <span className={`text-sm ${
                    region.availability >= 99.95 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {region.availability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;