import React from 'react';
import Icon from '@/components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border hover:border-accent transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{value}</h3>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${iconColor}`}>
          <Icon name={icon} size={20} color="var(--color-foreground)" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-xs md:text-sm font-medium">{change}</span>
        </div>
        <span className="text-xs text-muted-foreground">vs last period</span>
      </div>
      
      {trend && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${changeType === 'positive' ? 'bg-success' : 'bg-error'}`}
                style={{ width: `${Math.abs(parseFloat(change))}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{trend}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;