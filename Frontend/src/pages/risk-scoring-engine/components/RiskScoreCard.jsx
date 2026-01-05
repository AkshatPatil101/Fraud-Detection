import React from 'react';
import Icon from '@/components/AppIcon';

const RiskScoreCard = ({ score, label, trend, trendValue, color, icon }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30';
      case 'warning':
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
      case 'error':
        return 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30';
      default:
        return 'bg-gradient-to-br from-primary/20 to-secondary/10 border-primary/30';
    }
  };

  const getScoreColor = () => {
    switch (color) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-accent';
    }
  };

  return (
    <div className={`rounded-xl border p-4 md:p-6 ${getColorClasses()} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${color === 'success' ? 'bg-green-500/20' : color === 'warning' ? 'bg-yellow-500/20' : color === 'error' ? 'bg-red-500/20' : 'bg-primary/20'}`}>
            <Icon name={icon} size={20} color={color === 'success' ? 'var(--color-success)' : color === 'warning' ? 'var(--color-warning)' : color === 'error' ? 'var(--color-error)' : 'var(--color-accent)'} />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${getScoreColor()}`}>{score}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} color={trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} />
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{trendValue}</span>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreCard;