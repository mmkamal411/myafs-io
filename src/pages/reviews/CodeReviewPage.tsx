import React, { useState } from 'react';
import { GitPullRequest, MessageSquare, User, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface Review {
  id: string;
  title: string;
  author: string;
  status: 'pending' | 'approved' | 'changes_requested';
  repository: string;
  branch: string;
  created: string;
  updated: string;
  reviewers: {
    name: string;
    status: 'pending' | 'approved' | 'changes_requested';
  }[];
  comments: number;
  additions: number;
  deletions: number;
}

const reviews: Review[] = [
  {
    id: 'PR-123',
    title: 'Add OAuth2 Authentication Flow',
    author: 'Sarah Chen',
    status: 'pending',
    repository: 'auth-service',
    branch: 'feature/oauth-auth',
    created: '2024-03-15T10:30:00Z',
    updated: '2024-03-15T14:15:00Z',
    reviewers: [
      { name: 'John Doe', status: 'approved' },
      { name: 'Alice Smith', status: 'pending' }
    ],
    comments: 8,
    additions: 245,
    deletions: 32
  },
  {
    id: 'PR-124',
    title: 'Optimize Database Queries',
    author: 'Mike Johnson',
    status: 'changes_requested',
    repository: 'api-service',
    branch: 'fix/db-optimization',
    created: '2024-03-15T09:00:00Z',
    updated: '2024-03-15T13:45:00Z',
    reviewers: [
      { name: 'Bob Wilson', status: 'changes_requested' },
      { name: 'Emma Davis', status: 'approved' }
    ],
    comments: 12,
    additions: 156,
    deletions: 89
  }
];

const CodeReviewPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReviews = reviews.filter(review =>
    selectedStatus === 'all' || review.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-600';
      case 'changes_requested': return 'bg-red-100 text-red-600';
      default: return 'bg-yellow-100 text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'changes_requested': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <GitPullRequest className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Code Reviews</h1>
            <p className="text-sm text-gray-600">Review and manage pull requests</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'approved', 'changes_requested'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === status
                ? 'bg-accent-gradient text-white'
                : 'bg-white text-gray-600 hover:bg-light-100'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{review.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(review.status)}`}>
                      {getStatusIcon(review.status)}
                      {review.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{review.repository}</span>
                    <span>•</span>
                    <span>{review.branch}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <div>Created {new Date(review.created).toLocaleString()}</div>
                    <div>Updated {new Date(review.updated).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>{review.comments} comments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">+{review.additions}</span>
                    <span className="text-red-600">-{review.deletions}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.reviewers.map((reviewer, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${getStatusColor(reviewer.status)}`}
                      title={`${reviewer.name}: ${reviewer.status.replace('_', ' ')}`}
                    >
                      <User className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-center justify-end gap-3">
                <button className="px-4 py-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors">
                  View Changes
                </button>
                <button className="px-4 py-2 bg-accent-gradient text-white font-medium rounded-lg hover:shadow-md transition-all duration-300">
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeReviewPage;