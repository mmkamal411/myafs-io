import React from 'react';
import { Compass, ArrowRight, Star, GitFork, Users } from 'lucide-react';

interface ExploreItem {
  id: string;
  title: string;
  description: string;
  category: string;
  stars: number;
  forks: number;
  contributors: number;
  image?: string;
}

const exploreData: ExploreItem[] = [
  {
    id: '1',
    title: 'Service Template: React Microservice',
    description: 'Production-ready React service template with TypeScript, testing, and monitoring setup',
    category: 'Frontend Template',
    stars: 245,
    forks: 58,
    contributors: 12,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&h=150&q=80'
  },
  {
    id: '2',
    title: 'API Gateway Pattern',
    description: 'Reference implementation of API Gateway pattern with rate limiting and caching',
    category: 'Backend Pattern',
    stars: 189,
    forks: 34,
    contributors: 8,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&h=150&q=80'
  },
  {
    id: '3',
    title: 'DevOps Toolkit',
    description: 'Collection of tools and scripts for CI/CD pipeline setup and monitoring',
    category: 'DevOps',
    stars: 312,
    forks: 87,
    contributors: 15,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&h=150&q=80'
  }
];

const categories = [
  'Frontend Templates',
  'Backend Patterns',
  'DevOps Tools',
  'Security Patterns',
  'Data Pipeline Templates',
  'Monitoring Solutions'
];

const ExplorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Compass className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Explore</h1>
          <p className="text-sm text-gray-600">Discover templates, plugins and tools</p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
          >
            <span className="text-sm font-medium text-gray-700">{category}</span>
          </button>
        ))}
      </div>

      {/* Featured Items */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-6">Featured Templates & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 object-cover"
                />
              )}
              <div className="p-6">
                <span className="text-xs font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{item.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{item.forks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{item.contributors}</span>
                    </div>
                  </div>
                  <button className="text-accent-600 hover:text-accent-700">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Documentation & Resources */}
      <section>
        <h2 className="text-lg font-semibold mb-6">Documentation & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Getting Started Guide',
              description: 'Learn how to use templates and tools effectively',
              icon: '📚'
            },
            {
              title: 'Best Practices',
              description: 'Recommended patterns and architectures',
              icon: '✨'
            },
            {
              title: 'API Documentation',
              description: 'Comprehensive API references and examples',
              icon: '🔧'
            }
          ].map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="text-2xl mb-3">{resource.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <button className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;