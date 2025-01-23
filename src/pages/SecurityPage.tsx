import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Search, Filter, Clock } from 'lucide-react';

interface SecurityFinding {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  resource: string;
  status: 'open' | 'in_progress' | 'resolved';
  detectedAt: string;
  description: string;
  remediation: string;
}

const wizFindings: SecurityFinding[] = [
  {
    id: '1',
    title: 'Unencrypted S3 Bucket',
    severity: 'critical',
    category: 'Data Security',
    resource: 'storage-bucket-prod',
    status: 'open',
    detectedAt: '2024-03-15T10:30:00Z',
    description: 'Production S3 bucket does not have server-side encryption enabled',
    remediation: 'Enable default encryption using AES-256 or AWS KMS'
  },
  {
    id: '2',
    title: 'Public Security Group',
    severity: 'high',
    category: 'Network Security',
    resource: 'sg-prod-api',
    status: 'in_progress',
    detectedAt: '2024-03-15T09:15:00Z',
    description: 'Security group allows unrestricted inbound access (0.0.0.0/0)',
    remediation: 'Restrict inbound rules to specific IP ranges or security groups'
  },
  {
    id: '3',
    title: 'IAM User Access Key Rotation',
    severity: 'medium',
    category: 'Identity',
    resource: 'user/admin',
    status: 'open',
    detectedAt: '2024-03-14T15:45:00Z',
    description: 'Access keys have not been rotated in over 90 days',
    remediation: 'Rotate access keys and implement key rotation policy'
  }
];

const SecurityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-600';
      case 'high': return 'bg-orange-100 text-orange-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-600';
      case 'in_progress': return 'bg-blue-100 text-blue-600';
      default: return 'bg-yellow-100 text-yellow-600';
    }
  };

  const filteredFindings = wizFindings.filter(finding => {
    const matchesSearch = finding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         finding.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || finding.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Security Findings</h1>
            <p className="text-sm text-gray-600">Wiz.io security analysis and recommendations</p>
          </div>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Critical Findings', value: '2', change: '+1' },
          { label: 'High Risk Findings', value: '5', change: '-2' },
          { label: 'Medium Risk Findings', value: '12', change: '0' },
          { label: 'Security Score', value: '85/100', change: '+3' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm text-gray-600 mb-2">{metric.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-red-600' :
                metric.change.startsWith('-') ? 'text-green-600' :
                'text-gray-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search findings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
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

      {/* Findings List */}
      <div className="space-y-6">
        {filteredFindings.map((finding) => (
          <div key={finding.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      finding.severity === 'critical' ? 'text-red-500' :
                      finding.severity === 'high' ? 'text-orange-500' :
                      'text-yellow-500'
                    }`} />
                    <h3 className="text-lg font-semibold">{finding.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                      {finding.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                      {finding.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">{finding.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {new Date(finding.detectedAt).toLocaleString()}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Resource</h4>
                  <p className="text-sm text-gray-600">{finding.resource}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{finding.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Remediation</h4>
                  <p className="text-sm text-gray-600">{finding.remediation}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-center justify-end gap-3">
                <button className="px-4 py-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-accent-gradient text-white font-medium rounded-lg hover:shadow-md transition-all duration-300">
                  Start Remediation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityPage;