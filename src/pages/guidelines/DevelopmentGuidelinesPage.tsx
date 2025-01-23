import React from 'react';
import { FileText, Book, Code, Shield } from 'lucide-react';

interface Guideline {
  id: string;
  title: string;
  category: 'code' | 'security' | 'process' | 'architecture';
  description: string;
  lastUpdated: string;
  author: string;
  importance: 'critical' | 'high' | 'medium';
}

const guidelines: Guideline[] = [
  {
    id: '1',
    title: 'Code Style & Formatting',
    category: 'code',
    description: 'Standards for code formatting, naming conventions, and documentation',
    lastUpdated: '2024-03-15',
    author: 'Development Team',
    importance: 'high'
  },
  {
    id: '2',
    title: 'Security Best Practices',
    category: 'security',
    description: 'Guidelines for secure coding, authentication, and data protection',
    lastUpdated: '2024-03-14',
    author: 'Security Team',
    importance: 'critical'
  },
  {
    id: '3',
    title: 'Code Review Process',
    category: 'process',
    description: 'Standards and expectations for code review submissions and feedback',
    lastUpdated: '2024-03-13',
    author: 'Development Team',
    importance: 'high'
  },
  {
    id: '4',
    title: 'Microservices Architecture',
    category: 'architecture',
    description: 'Guidelines for service design, communication, and deployment',
    lastUpdated: '2024-03-12',
    author: 'Architecture Team',
    importance: 'critical'
  }
];

const DevelopmentGuidelinesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Book className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Development Guidelines</h1>
            <p className="text-sm text-gray-600">Standards and best practices for development</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline) => (
          <div
            key={guideline.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                guideline.category === 'code' ? 'bg-blue-100 text-blue-600' :
                guideline.category === 'security' ? 'bg-red-100 text-red-600' :
                guideline.category === 'process' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {guideline.category === 'code' ? <Code className="w-5 h-5" /> :
                 guideline.category === 'security' ? <Shield className="w-5 h-5" /> :
                 guideline.category === 'process' ? <FileText className="w-5 h-5" /> :
                 <Book className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{guideline.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{guideline.description}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                guideline.importance === 'critical' ? 'bg-red-100 text-red-600' :
                guideline.importance === 'high' ? 'bg-orange-100 text-orange-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {guideline.importance}
              </span>
              <div className="text-gray-600">
                Updated {new Date(guideline.lastUpdated).toLocaleDateString()}
              </div>
            </div>

            <button className="w-full mt-4 py-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors text-sm font-medium">
              View Guidelines
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopmentGuidelinesPage;