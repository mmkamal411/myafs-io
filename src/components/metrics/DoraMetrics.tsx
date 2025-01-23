import React from 'react';
import { Rocket, Clock, AlertTriangle, Activity } from 'lucide-react';

interface DoraMetricsProps {
  timeRange: string;
}

const mockData = {
  deploymentFrequency: {
    current: 4.2,
    trend: '+12%',
    benchmark: 'Elite: 1+ per day',
    history: [3.8, 4.0, 4.1, 4.2, 4.2, 4.3, 4.1, 4.2]
  },
  leadTime: {
    current: 2.5,
    trend: '-8%',
    benchmark: 'Elite: Less than 1 day',
    unit: 'days',
    history: [2.8, 2.7, 2.6, 2.5, 2.5, 2.4, 2.5, 2.5]
  },
  mttr: {
    current: 3.2,
    trend: '-15%',
    benchmark: 'Elite: Less than 1 hour',
    unit: 'hours',
    history: [4.1, 3.8, 3.5, 3.3, 3.2, 3.2, 3.1, 3.2]
  },
  changeFailureRate: {
    current: 1.8,
    trend: '-5%',
    benchmark: 'Elite: 0-15%',
    unit: '%',
    history: [2.1, 2.0, 1.9, 1.8, 1.8, 1.7, 1.8, 1.8]
  }
};

const DoraMetrics: React.FC<DoraMetricsProps> = ({ timeRange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          DORA Metrics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Deployment Frequency */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Rocket className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-green-600">{mockData.deploymentFrequency.trend}</span>
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Deployment Frequency</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{mockData.deploymentFrequency.current}</span>
              <span className="text-sm text-gray-600">per day</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{mockData.deploymentFrequency.benchmark}</p>
          </div>
          <div className="h-16 flex items-end gap-1">
            {mockData.deploymentFrequency.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-100 rounded-t"
                style={{ height: `${(value / 5) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Lead Time */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-green-600">{mockData.leadTime.trend}</span>
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Lead Time for Changes</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{mockData.leadTime.current}</span>
              <span className="text-sm text-gray-600">{mockData.leadTime.unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{mockData.leadTime.benchmark}</p>
          </div>
          <div className="h-16 flex items-end gap-1">
            {mockData.leadTime.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-purple-100 rounded-t"
                style={{ height: `${(value / 3) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* MTTR */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-green-600">{mockData.mttr.trend}</span>
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Mean Time to Recovery</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{mockData.mttr.current}</span>
              <span className="text-sm text-gray-600">{mockData.mttr.unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{mockData.mttr.benchmark}</p>
          </div>
          <div className="h-16 flex items-end gap-1">
            {mockData.mttr.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-green-100 rounded-t"
                style={{ height: `${(value / 5) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Change Failure Rate */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-100 rounded-lg">
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-green-600">{mockData.changeFailureRate.trend}</span>
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Change Failure Rate</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{mockData.changeFailureRate.current}</span>
              <span className="text-sm text-gray-600">{mockData.changeFailureRate.unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{mockData.changeFailureRate.benchmark}</p>
          </div>
          <div className="h-16 flex items-end gap-1">
            {mockData.changeFailureRate.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-red-100 rounded-t"
                style={{ height: `${(value / 3) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoraMetrics;