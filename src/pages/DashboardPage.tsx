import React, { useState } from 'react';
import DashboardMetrics from '../components/DashboardMetrics';
import EngineeringMetrics from '../components/EngineeringMetrics';
import DoraMetrics from '../components/metrics/DoraMetrics';
import SystemHealth from '../components/metrics/SystemHealth';
import CodeQualityMetrics from '../components/metrics/CodeQualityMetrics';
import TeamCalendar from '../components/TeamCalendar';
import TaskBoard from '../components/TaskBoard';

const timeRanges = [
  { label: 'Last 30 Days', value: '30' },
  { label: 'Last 60 Days', value: '60' },
  { label: 'Last 90 Days', value: '90' }
];

const DashboardPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Engineering Dashboard</h1>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* DORA Metrics */}
        <DoraMetrics timeRange={selectedTimeRange} />

        {/* System Health */}
        <SystemHealth timeRange={selectedTimeRange} />

        {/* Code Quality Metrics */}
        <CodeQualityMetrics timeRange={selectedTimeRange} />

        {/* GitOps Metrics */}
        <EngineeringMetrics timeRange={selectedTimeRange} />

        {/* Team Calendar */}
        <TeamCalendar />

        {/* Task Board */}
        <TaskBoard />
      </div>
    </div>
  );
};

export default DashboardPage;