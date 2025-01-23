import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, FolderKanban, Calendar, 
  MessageSquare, FileText, BarChart2, 
  CheckSquare, Settings, HelpCircle, X,
  Clock, Users, Briefcase, Sparkles,
  Bug, Shield, GitBranch, Rocket,
  Database, Globe, Zap, Lock,
  PlusCircle
} from 'lucide-react';

interface AppLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  onExternalNavigation: (url: string | null) => void;
}

const internalApps = [
  {
    name: 'Dashboard',
    icon: LayoutGrid,
    path: '/',
    color: 'blue',
    description: 'Overview of metrics and activities'
  },
  {
    name: 'Create',
    icon: PlusCircle,
    path: '/create',
    color: 'purple',
    description: 'Create new services and resources'
  },
  {
    name: 'Plan',
    icon: GitBranch,
    path: '/plan',
    color: 'green',
    description: 'Project planning and roadmap'
  },
  {
    name: 'Design',
    icon: Briefcase,
    path: '/design',
    color: 'yellow',
    description: 'Design and architecture'
  },
  {
    name: 'Code',
    icon: FileText,
    path: '/code',
    color: 'red',
    description: 'Code management'
  },
  {
    name: 'Test',
    icon: CheckSquare,
    path: '/test',
    color: 'indigo',
    description: 'Testing and quality'
  },
  {
    name: 'Deploy',
    icon: Rocket,
    path: '/deploy',
    color: 'pink',
    description: 'Deployment management'
  },
  {
    name: 'Monitor',
    icon: BarChart2,
    path: '/monitor',
    color: 'gray',
    description: 'System monitoring'
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings',
    color: 'cyan',
    description: 'System settings'
  },
  {
    name: 'Catalog',
    icon: Globe,
    path: '/catalog',
    color: 'emerald',
    description: 'Service catalog'
  },
  {
    name: 'Templates',
    icon: FileText,
    path: '/templates',
    color: 'violet',
    description: 'Project templates'
  },
  {
    name: 'Documentation',
    icon: FileText,
    path: '/documentation',
    color: 'amber',
    description: 'System documentation'
  },
  {
    name: 'Explore',
    icon: Globe,
    path: '/explore',
    color: 'lime',
    description: 'Explore resources'
  },
  {
    name: 'Database',
    icon: Database,
    path: '/database',
    color: 'orange',
    description: 'Database management'
  },
  {
    name: 'API Gateway',
    icon: Globe,
    path: '/api-gateway',
    color: 'rose',
    description: 'API management'
  }
];

const externalApps = [
  {
    name: 'Time Tracking',
    icon: Clock,
    url: 'https://go.afs.com/time',
    color: 'emerald',
    description: 'Track work hours'
  },
  {
    name: 'Team Directory',
    icon: Users,
    url: 'https://01156-afsdefense.msappproxy.us/staffr/',
    color: 'orange',
    description: 'Employee directory'
  },
  {
    name: 'Resource Manager',
    icon: Briefcase,
    url: 'https://smartafs.lightning.force.com/lightning/o/UserAppMenuItem/home',
    color: 'sky',
    description: 'Resource allocation'
  },
  {
    name: 'AI Assistant',
    icon: Sparkles,
    url: 'https://genaihub.accenturefederaldefense.com/',
    color: 'violet',
    description: 'AI-powered tools'
  },
  {
    name: 'Issue Tracker',
    icon: Bug,
    url: 'https://01110-afsdefense.msappproxy.us/secure/Dashboard.jspa',
    color: 'blue',
    description: 'Track issues'
  },
  {
    name: 'Access Control',
    icon: Shield,
    url: 'https://iam-afsdefense.msappproxy.us/cayosoftwebadmin/#!/app/home',
    color: 'indigo',
    description: 'Manage access'
  }
];

const AppLauncher = ({ isOpen, onClose, onExternalNavigation }: AppLauncherProps) => {
  const navigate = useNavigate();

  const handleAppClick = (path: string) => {
    onExternalNavigation(null);
    navigate(path);
    onClose();
  };

  const handleExternalAppClick = (url: string) => {
    onExternalNavigation(url);
    onClose();
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-600' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      sky: { bg: 'bg-sky-100', text: 'text-sky-600' },
      violet: { bg: 'bg-violet-100', text: 'text-violet-600' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
      lime: { bg: 'bg-lime-100', text: 'text-lime-600' },
      rose: { bg: 'bg-rose-100', text: 'text-rose-600' }
    };
    return colorMap[color];
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-16 inset-x-4 sm:top-20 sm:right-4 sm:left-auto sm:w-[600px] lg:w-[720px] bg-white rounded-2xl shadow-xl transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-light-900">
              Apps
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-light-100 transition-colors"
              aria-label="Close app launcher"
            >
              <X className="w-5 h-5 text-light-500" />
            </button>
          </div>

          {/* Internal Apps Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-light-500 mb-4">Internal Apps</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {internalApps.map((app) => {
                const Icon = app.icon;
                const colors = getColorClasses(app.color);
                return (
                  <button
                    key={app.name}
                    onClick={() => handleAppClick(app.path)}
                    className="group flex flex-col items-center p-3 sm:p-4 rounded-xl hover:bg-light-50 transition-all duration-300"
                    aria-label={`Open ${app.name}`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-light-700 text-center line-clamp-2">
                      {app.name}
                    </span>
                    <span className="text-xs text-light-500 text-center mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {app.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* External Apps Section */}
          <div>
            <h3 className="text-sm font-medium text-light-500 mb-4">External Apps</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {externalApps.map((app) => {
                const Icon = app.icon;
                const colors = getColorClasses(app.color);
                return (
                  <button
                    key={app.name}
                    onClick={() => handleExternalAppClick(app.url)}
                    className="group flex flex-col items-center p-3 sm:p-4 rounded-xl hover:bg-light-50 transition-all duration-300"
                    aria-label={`Open ${app.name}`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-light-700 text-center line-clamp-2">
                      {app.name}
                    </span>
                    <span className="text-xs text-light-500 text-center mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {app.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;