import React, { useState } from 'react';
import { Activity, AlertTriangle, TrendingUp, Clock, Server, Database, Globe } from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  threshold: string;
}

interface Problem {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved';
  service: string;
  impact: string;
  detectedAt: string;
  duration: string;
}

const dynatraceMetrics: Metric[] = [
  {
    id: '1',
    name: 'Response Time',
    value: '235',
    unit: 'ms',
    change: '+12%',
    trend: 'up',
    threshold: '500ms'
  },
  {
    id: '2',
    name: 'Error Rate',
    value: '0.5',
    unit: '%',
    change: '-0.2%',
    trend: 'down',
    threshold: '1%'
  },
  {
    id: '3',
    name: 'CPU Usage',
    value: '78',
    unit: '%',
    change: '+5%',
    trend: 'up',
    threshold: '85%'
  },
  {
    id: '4',
    name: 'Memory Usage',
    value: '6.2',
    unit: 'GB',
    change: '+0.4GB',
    trend: 'up',
    threshold: '8GB'
  }
];

const dynatraceProblems: Problem[] = [
  {
    id: '1',
    title: 'High Response Time',
    severity: 'critical',
    status: 'active',
    service: 'Payment API',
    impact: '2.5k users affected',
    detectedAt: '2024-03-15T10:30:00Z',
    duration: '15m'
  },
  {
    id: '2',
    title: 'Database Connection Pool Exhausted',
    severity: 'high',
    status: 'investigating',
    service: 'User Service',
    impact: 'Increased latency',
    detectedAt: '2024-03-15T09:45:00Z',
    duration: '30m'
  }
];

const MonitorPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-600';
      case 'high': return 'bg-orange-100 text-orange-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-600';
      case 'investigating': return 'bg-yellow-100 text-yellow-600';
      case 'resolved': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Activity className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Observability</h1>
            <p className="text-sm text-gray-600">Dynatrace monitoring and analytics</p>
          </div>
        </div>
      </div>

      {/* Service Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Globe, name: 'API Services', status: 'Healthy', uptime: '99.99%' },
          { icon: Database, name: 'Databases', status: 'Warning', uptime: '99.95%' },
          { icon: Server, name: 'Infrastructure', status: 'Healthy', uptime: '100%' },
          { icon: Activity, name: 'User Sessions', status: 'Critical', count: '15.2k' }
        ].map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-light-100 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.status === 'Healthy' ? 'bg-green-100 text-green-600' :
                  service.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {service.status}
                </span>
              </div>
              <h3 className="font-medium">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {service.uptime ? `Uptime: ${service.uptime}` : `Active: ${service.count}`}
              </p>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynatraceMetrics.map((metric) => (
            <div key={metric.id} className="p-4 bg-light-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{metric.name}</span>
                <span className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-red-600' :
                  metric.trend === 'down' ? 'text-green-600' :
                  'text-gray-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold">
                  {metric.value}
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    {metric.unit}
                  </span>
                </span>
                <span className="text-xs text-gray-600">
                  Threshold: {metric.threshold}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Problems */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Active Problems</h2>
        <div className="space-y-4">
          {dynatraceProblems.map((problem) => (
            <div key={problem.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className={`w-5 h-5 ${
                    problem.severity === 'critical' ? 'text-red-500' :
                    'text-orange-500'
                  }`} />
                  <h3 className="font-medium">{problem.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(problem.severity)}`}>
                    {problem.severity}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(problem.status)}`}>
                    {problem.status}
                  </span>
                  <span className="text-gray-600">{problem.service}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{problem.impact}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{problem.duration}</span>
                </div>
                <div className="mt-1">
                  {new Date(problem.detectedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;