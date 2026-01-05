import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';

const RealTimeMonitor = () => {
  const [systemHealth, setSystemHealth] = useState({
    status: 'operational',
    uptime: '99.98%',
    activeConnections: 1247,
    processingRate: 3542
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'alert', message: 'New critical alert detected', timestamp: new Date() },
    { id: 2, type: 'resolved', message: 'Alert #A-2847 resolved', timestamp: new Date(Date.now() - 120000) },
    { id: 3, type: 'assigned', message: 'Alert #A-2848 assigned to Sarah Chen', timestamp: new Date(Date.now() - 240000) }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        activeConnections: prev?.activeConnections + Math.floor(Math.random() * 10 - 5),
        processingRate: prev?.processingRate + Math.floor(Math.random() * 100 - 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      alert: 'AlertCircle',
      resolved: 'CheckCircle',
      assigned: 'UserCheck',
      escalated: 'TrendingUp'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      alert: 'text-warning',
      resolved: 'text-success',
      assigned: 'text-info',
      escalated: 'text-error'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Real-Time Monitor</h3>
            <p className="text-xs text-muted-foreground">Live system status</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-xs font-medium text-success">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">System Status</p>
          <p className="text-sm font-semibold text-success">{systemHealth?.status?.toUpperCase()}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Uptime</p>
          <p className="text-sm font-semibold text-foreground">{systemHealth?.uptime}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Active Connections</p>
          <p className="text-sm font-semibold text-foreground">{systemHealth?.activeConnections?.toLocaleString()}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Processing Rate</p>
          <p className="text-sm font-semibold text-foreground">{systemHealth?.processingRate}/min</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start gap-3 p-2 bg-muted/30 rounded">
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={16} 
                color={`var(--color-${getActivityColor(activity?.type)?.replace('text-', '')})`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity?.message}</p>
                <p className="text-xs text-muted-foreground">
                  {activity?.timestamp?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;