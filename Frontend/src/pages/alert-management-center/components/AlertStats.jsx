import React from 'react';
import Icon from '@/components/AppIcon';

const AlertStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Active Alerts',
      value: stats?.activeAlerts,
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+12%',
      changeType: 'increase'
    },
    {
      label: 'Critical Alerts',
      value: stats?.criticalAlerts,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '-8%',
      changeType: 'decrease'
    },
    {
      label: 'Resolved Today',
      value: stats?.resolvedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+24%',
      changeType: 'increase'
    },
    {
      label: 'Avg Response Time',
      value: stats?.avgResponseTime,
      icon: 'Clock',
      color: 'text-info',
      bgColor: 'bg-info/10',
      change: '-15%',
      changeType: 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards?.map((stat, index) => (
        <div 
          key={index}
          className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              stat?.changeType === 'increase' ? 'text-success bg-success/10' : 'text-error bg-error/10'
            }`}>
              {stat?.change}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {stat?.value}
          </h3>
          <p className="text-sm text-muted-foreground">{stat?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertStats;