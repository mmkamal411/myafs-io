import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Clock, Zap, Shield, Calendar, 
  ListTodo, BarChart2, Cloud, Activity,
  GitBranch, Database, Globe, Lock,
  AlertTriangle, CheckCircle2, Users
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  type: 'warning' | 'error' | 'info';
  service: string;
  timestamp: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    title: 'High CPU Usage Detected',
    type: 'warning',
    service: 'Payment Service',
    timestamp: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'API Response Time Degradation',
    type: 'error',
    service: 'API Gateway',
    timestamp: '2024-03-15T09:45:00Z'
  }
];

const MetricCard = ({ title, value, icon: Icon, trend, color, onClick }: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  color: string;
  onClick?: () => void;
}) => (
  <div 
    className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-mono font-bold mt-1">{value}</h3>
        {trend && (
          <p className={`text-sm mt-2 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend} vs last week
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const DashboardMetrics = () => {
  const navigate = useNavigate();

  const doraMetrics = [
    {
      title: "Deployment Frequency",
      value: "4.2/day",
      icon: Zap,
      trend: "+12%",
      color: "bg-blue-100 text-blue-600",
      path: "/deploy"
    },
    {
      title: "Lead Time",
      value: "2.5 days",
      icon: Clock,
      trend: "-8%",
      color: "bg-purple-100 text-purple-600",
      path: "/code"
    },
    {
      title: "Change Failure Rate",
      value: "1.8%",
      icon: Activity,
      trend: "-5%",
      color: "bg-green-100 text-green-600",
      path: "/monitor"
    }
  ];

  const systemMetrics = [
    {
      title: "API Response Time",
      value: "235ms",
      icon: Globe,
      trend: "-12%",
      color: "bg-lime-100 text-lime-600",
      path: "/api-gateway"
    },
    {
      title: "Database Health",
      value: "98.5%",
      icon: Database,
      trend: "+1%",
      color: "bg-amber-100 text-amber-600",
      path: "/database"
    },
    {
      title: "Security Score",
      value: "94%",
      icon: Lock,
      trend: "+2%",
      color: "bg-rose-100 text-rose-600",
      path: "/security"
    }
  ];

  const codeMetrics = [
    {
      title: "Open PRs",
      value: "12",
      icon: GitBranch,
      color: "bg-emerald-100 text-emerald-600",
      path: "/version-control"
    },
    {
      title: "Code Coverage",
      value: "87%",
      icon: Shield,
      trend: "+5%",
      color: "bg-red-100 text-red-600",
      path: "/test"
    }
  ];

  return (
    <div className="space-y-8 animate-list">
      {/* DORA Metrics */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">DORA Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doraMetrics.map((metric, i) => (
            <MetricCard 
              key={i} 
              {...metric} 
              onClick={() => navigate(metric.path)}
            />
          ))}
        </div>
      </section>

      {/* System Health */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemMetrics.map((metric, i) => (
            <MetricCard 
              key={i} 
              {...metric} 
              onClick={() => navigate(metric.path)}
            />
          ))}
        </div>
      </section>

      {/* Code & Quality */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Code & Quality</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {codeMetrics.map((metric, i) => (
            <MetricCard 
              key={i} 
              {...metric} 
              onClick={() => navigate(metric.path)}
            />
          ))}
        </div>
      </section>

      {/* Calendar & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <section 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/plan')}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {[
              { time: "10:00 AM", event: "Sprint Planning", type: "Team" },
              { time: "2:00 PM", event: "Architecture Review", type: "Technical" },
              { time: "4:30 PM", event: "Team Standup", type: "Daily" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <span className="text-sm text-gray-600">{item.time}</span>
                  <p className="font-medium">{item.event}</p>
                </div>
                <span className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/code')}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ListTodo className="w-5 h-5" />
            Active Tickets
          </h2>
          <div className="space-y-4">
            {[
              { id: "PROJ-123", title: "Update API Documentation", priority: "High", status: "In Progress" },
              { id: "PROJ-124", title: "Fix Authentication Bug", priority: "Critical", status: "Review" },
              { id: "PROJ-125", title: "Implement New Feature", priority: "Medium", status: "Todo" }
            ].map((ticket, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{ticket.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                      ticket.status === 'Review' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="font-medium mt-1">{ticket.title}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                  ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {ticket.priority}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Active Alerts */}
      <section className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Active Alerts
          </h2>
          <Link
            to="/monitor"
            className="text-accent-600 hover:text-accent-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div className="flex items-start gap-3">
                {alert.type === 'error' ? (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{alert.service}</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardMetrics;