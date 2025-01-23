import React from 'react';
import { Bell, Clock, User, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Deployment Successful',
    description: 'Frontend application has been deployed to production',
    type: 'success',
    timestamp: '2024-03-15T10:30:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Security Alert',
    description: 'Unusual login activity detected from unknown IP',
    type: 'alert',
    timestamp: '2024-03-15T09:15:00Z',
    read: false
  },
  {
    id: '3',
    title: 'Cost Threshold Exceeded',
    description: 'Monthly AWS costs have exceeded the budget threshold',
    type: 'warning',
    timestamp: '2024-03-15T08:45:00Z',
    read: true
  }
];

const NotificationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Bell className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-gray-600">Stay updated with important alerts and information</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 ${
              !notification.read ? 'border-l-4 border-accent-500' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                notification.type === 'success' ? 'bg-green-100 text-green-600' :
                notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                 notification.type === 'alert' ? <AlertTriangle className="w-5 h-5" /> :
                 notification.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 <Bell className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{notification.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;