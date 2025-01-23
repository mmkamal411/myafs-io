import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, Grid, Bell, User, X, 
  Settings, LogOut, Search,
  Code, GitBranch, FileText, Rocket, TestTube, Activity, Code2, ChevronDown,
  Box, Database, Cloud, Shield, BarChart2, Users,
  MessageSquare, HelpCircle, Layers, Workflow, Clock,
  AlertTriangle, DollarSign, BookOpen, Briefcase,
  Compass, PlusCircle
} from 'lucide-react';
import AppLauncher from './AppLauncher';
import SearchBar from './SearchBar';
import TimezoneDisplay from './TimezoneDisplay';

interface HeaderProps {
  onExternalNavigation: (url: string | null) => void;
}

const Header = ({ onExternalNavigation }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);
  const [showTimezones, setShowTimezones] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const navigationLinks = [
    { text: 'Catalog', icon: Layers, path: '/catalog' },
    { text: 'Templates', icon: FileText, path: '/templates' },
    { text: 'Docs', icon: FileText, path: '/documentation' },
    { text: 'Explore', icon: Compass, path: '/explore' },
    { text: 'Create', icon: PlusCircle, path: '/create', highlight: true }
  ];

  const devTools = [
    { text: 'VSCode', icon: Code2, action: () => window.open('https://vscode.dev', '_blank') },
    { text: 'Codespaces', icon: GitBranch, action: () => window.open('https://github.com/codespaces/new', '_blank') }
  ];

  const handleNavigate = (path: string) => {
    if (path === activeSection) {
      setActiveSection(null);
      onExternalNavigation(null);
    } else {
      setActiveSection(path);
      onExternalNavigation(null);
      navigate(path);
    }
  };

  const handleSectionClick = useCallback((title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  }, [expandedSection]);

  const menuSections = [
    {
      title: 'Development Lifecycle',
      items: [
        { icon: Box, text: 'Project Templates', path: '/templates' },
        { icon: GitBranch, text: 'Code Repositories', path: '/code' },
        { icon: FileText, text: 'Development Guidelines', path: '/guidelines' },
        { icon: Code, text: 'API Documentation', path: '/api-docs' },
        { icon: Activity, text: 'Code Review', path: '/reviews' },
        { icon: AlertTriangle, text: 'Technical Debt', path: '/tech-debt' }
      ]
    },
    {
      title: 'DevOps & Automation',
      items: [
        { icon: Rocket, text: 'CI/CD Pipelines', path: '/deploy' },
        { icon: Cloud, text: 'Infrastructure', path: '/infrastructure' },
        { icon: Box, text: 'Containers', path: '/containers' },
        { icon: Layers, text: 'Environments', path: '/environments' },
        { icon: Activity, text: 'Releases', path: '/releases' },
        { icon: BarChart2, text: 'Monitoring', path: '/monitor' }
      ]
    },
    {
      title: 'Project Management',
      items: [
        { icon: Workflow, text: 'Portfolio', path: '/portfolio' },
        { icon: Clock, text: 'Sprint Planning', path: '/plan' },
        { icon: Users, text: 'Resource Management', path: '/resources' },
        { icon: AlertTriangle, text: 'Risk Management', path: '/risks' },
        { icon: DollarSign, text: 'Budget', path: '/finops' }
      ]
    },
    {
      title: 'Quality Assurance',
      items: [
        { icon: TestTube, text: 'Test Automation', path: '/test' },
        { icon: FileText, text: 'Test Cases', path: '/test-cases' },
        { icon: Shield, text: 'Security Scans', path: '/security' },
        { icon: Activity, text: 'Performance', path: '/performance' },
        { icon: BarChart2, text: 'Quality Metrics', path: '/metrics' }
      ]
    },
    {
      title: 'Operations & Support',
      items: [
        { icon: AlertTriangle, text: 'Incidents', path: '/incidents' },
        { icon: Clock, text: 'SLA Management', path: '/sla' },
        { icon: Activity, text: 'System Health', path: '/health' },
        { icon: Database, text: 'Backup & Recovery', path: '/backup' }
      ]
    },
    {
      title: 'Knowledge Base',
      items: [
        { icon: BookOpen, text: 'Documentation', path: '/documentation' },
        { icon: FileText, text: 'Best Practices', path: '/best-practices' },
        { icon: Users, text: 'Training', path: '/training' },
        { icon: MessageSquare, text: 'Troubleshooting', path: '/troubleshooting' }
      ]
    },
    {
      title: 'Team Collaboration',
      items: [
        { icon: Users, text: 'Team Directory', path: '/teams' },
        { icon: MessageSquare, text: 'Communication', path: '/communication' },
        { icon: Clock, text: 'Meetings', path: '/meetings' },
        { icon: Briefcase, text: 'Dependencies', path: '/dependencies' }
      ]
    },
    {
      title: 'Analytics & Reporting',
      items: [
        { icon: BarChart2, text: 'Development Metrics', path: '/dev-metrics' },
        { icon: Activity, text: 'Performance Analytics', path: '/analytics' },
        { icon: DollarSign, text: 'Cost Analysis', path: '/cost' },
        { icon: Users, text: 'Team Metrics', path: '/team-metrics' }
      ]
    },
    {
      title: 'Administration',
      items: [
        { icon: Settings, text: 'Platform Settings', path: '/settings' },
        { icon: Shield, text: 'Access Management', path: '/access' },
        { icon: Activity, text: 'Audit Logs', path: '/audit' },
        { icon: FileText, text: 'Compliance', path: '/compliance' }
      ]
    },
    {
      title: 'Support & Help',
      items: [
        { icon: HelpCircle, text: 'Help Center', path: '/help' },
        { icon: MessageSquare, text: 'Support Tickets', path: '/support' },
        { icon: FileText, text: 'FAQs', path: '/faqs' },
        { icon: MessageSquare, text: 'Feedback', path: '/feedback' }
      ]
    }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-light-200 z-50">
        <div className="h-full px-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-light-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-light-700" />
              </button>
              
              <span 
                onClick={() => handleNavigate('/')}
                className="text-xl font-sans font-bold text-accent-500 tracking-tight cursor-pointer"
              >
                myAFS.io
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1">
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.path;
                  return (
                    <button
                      key={link.text}
                      onClick={() => handleNavigate(link.path)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        link.highlight
                          ? 'bg-accent-gradient text-white hover:shadow-md'
                          : isActive
                          ? 'bg-light-100 text-accent-600'
                          : 'text-light-700 hover:text-accent-600 hover:bg-light-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.text}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Right Section - Dev Tools and Actions */}
          <div className="flex items-center space-x-2">
            {/* Dev Tools */}
            <div className="hidden md:flex items-center space-x-2 mr-4">
              {devTools.map((tool) => (
                <button
                  key={tool.text}
                  onClick={tool.action}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-light-100 text-light-700 hover:bg-light-200"
                >
                  <tool.icon className="w-4 h-4" />
                  {tool.text}
                </button>
              ))}
            </div>

            {/* Action Icons */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-light-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-light-700" />
            </button>
            
            <button
              onClick={() => setIsAppLauncherOpen(true)}
              className="p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-light-100 transition-colors"
              aria-label="App launcher"
            >
              <Grid className="w-5 h-5 text-light-700" />
            </button>
            
            <button
              onClick={() => navigate('/notifications')}
              className="p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-light-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-light-700" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowTimezones(!showTimezones)}
                className="p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-light-100 transition-colors"
                aria-label="Show timezones"
              >
                <Clock className="w-5 h-5 text-light-700" />
              </button>
              {showTimezones && <TimezoneDisplay />}
            </div>
            
            <button
              onClick={() => navigate('/settings')}
              className="ml-2 w-11 h-11 rounded-lg bg-accent-gradient flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="User profile"
            >
              <User className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Popup */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50">
          <div 
            ref={searchRef}
            className="absolute top-4 left-4 right-4 max-w-2xl mx-auto"
          >
            <SearchBar 
              onSearch={handleSearch}
              onClose={() => setShowSearch(false)}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Hamburger Menu */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity z-50 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        <div
          className={`fixed top-16 inset-x-0 bg-white shadow-xl transition-all duration-300 max-h-[85vh] overflow-y-auto ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm max-w-7xl mx-auto p-6 border-b border-light-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-sans font-bold text-accent-500 tracking-tight">
                  myAFS.io
                </span>
                <p className="text-sm text-light-500">
                  Developer Platform
                </p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-light-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-light-700" />
              </button>
            </div>
          </nav>

          {/* Menu Content */}
          <div className="max-w-7xl mx-auto flex flex-col pb-16">
            <nav className="flex-1 py-4">
              <div className="space-y-4 p-4">
                {menuSections.map((section) => (
                  <div 
                    key={section.title} 
                    className="border border-light-200 rounded-xl overflow-hidden"
                    role="region"
                    aria-label={section.title}
                  >
                    <button
                      onClick={() => handleSectionClick(section.title)}
                      className="w-full flex items-center justify-between p-4 bg-light-50 hover:bg-light-100 transition-colors"
                      aria-expanded={expandedSection === section.title}
                    >
                      <h3 className="text-sm font-bold text-light-700 uppercase tracking-wider">
                        {section.title}
                      </h3>
                      <div className={`transform transition-transform duration-300 ${
                        expandedSection === section.title ? 'rotate-180' : ''
                      }`}>
                        <ChevronDown className="w-5 h-5 text-light-500" />
                      </div>
                    </button>
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-2 p-4 transition-all duration-300 ease-in-out origin-top ${
                        expandedSection === section.title
                          ? 'opacity-100 max-h-[1000px]'
                          : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                    >
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.text}
                            onClick={() => {
                              handleNavigate(item.path);
                              setIsMenuOpen(false);
                              setExpandedSection(null);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 min-h-[44px] text-sm font-medium rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 ${
                              item.path === location.pathname
                                ? 'bg-accent-50 text-accent-600'
                                : 'text-light-700 hover:bg-white hover:text-accent-600'
                            }`}
                            aria-current={item.path === location.pathname ? 'page' : undefined}
                            role="menuitem"
                          >
                            <div className="p-2 rounded-lg bg-light-100 group-hover:bg-accent-50 transition-colors group-hover:text-accent-600">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="flex-1 group-hover:text-accent-600">{item.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            {/* Menu Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm max-w-7xl mx-auto w-full p-4 border-t border-light-200">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    handleNavigate('/settings');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 min-h-[44px] text-sm font-medium text-light-700 hover:bg-light-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                  role="menuitem"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={() => window.location.href = 'https://www.afs.com'} 
                  className="flex items-center gap-3 px-4 py-2 min-h-[44px] text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  role="menuitem"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Launcher */}
      <AppLauncher 
        isOpen={isAppLauncherOpen}
        onClose={() => setIsAppLauncherOpen(false)}
        onExternalNavigation={onExternalNavigation}
      />
    </>
  );
};

export default Header;