import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onViewDetails, onAssign, onResolve }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-error bg-error/10 border-error/30',
      high: 'text-warning bg-warning/10 border-warning/30',
      medium: 'text-info bg-info/10 border-info/30',
      low: 'text-success bg-success/10 border-success/30'
    };
    return colors?.[severity] || colors?.medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      new: 'AlertCircle',
      investigating: 'Search',
      assigned: 'UserCheck',
      resolved: 'CheckCircle',
      escalated: 'TrendingUp'
    };
    return icons?.[status] || 'AlertCircle';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg ${getSeverityColor(alert?.severity)} flex items-center justify-center`}>
            <Icon name={getStatusIcon(alert?.status)} size={24} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-1">
                  {alert?.title}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getSeverityColor(alert?.severity)}`}>
                  {alert?.severity?.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {alert?.description}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimestamp(alert?.timestamp)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="User" size={16} color="var(--color-muted-foreground)" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="text-sm font-medium text-foreground truncate">{alert?.userId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="text-sm font-medium text-foreground">${alert?.amount?.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground truncate">{alert?.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={16} color="var(--color-muted-foreground)" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Risk Score</p>
                <p className="text-sm font-medium text-foreground">{alert?.riskScore}/100</p>
              </div>
            </div>
          </div>

          {alert?.assignedTo && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded">
              <Image 
                src={alert?.assignedTo?.avatar} 
                alt={alert?.assignedTo?.avatarAlt}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-muted-foreground">
                Assigned to <span className="font-medium text-foreground">{alert?.assignedTo?.name}</span>
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button 
              variant="default" 
              size="sm" 
              iconName="Eye" 
              iconPosition="left"
              onClick={() => onViewDetails(alert?.id)}
            >
              View Details
            </Button>
            {alert?.status !== 'resolved' && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="UserPlus" 
                  iconPosition="left"
                  onClick={() => onAssign(alert?.id)}
                >
                  Assign
                </Button>
                <Button 
                  variant="success" 
                  size="sm" 
                  iconName="CheckCircle" 
                  iconPosition="left"
                  onClick={() => onResolve(alert?.id)}
                >
                  Resolve
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;