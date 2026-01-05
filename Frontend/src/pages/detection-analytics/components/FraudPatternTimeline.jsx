import React from 'react';
import Icon from '@/components/AppIcon';

const FraudPatternTimeline = ({ patterns }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-error text-error-foreground';
      case 'High':
        return 'bg-warning text-warning-foreground';
      case 'Medium':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'AlertTriangle';
      case 'High':
        return 'AlertCircle';
      case 'Medium':
        return 'Info';
      default:
        return 'CheckCircle';
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Fraud Pattern Timeline</h2>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-muted hover:bg-primary rounded-lg text-xs md:text-sm font-medium text-foreground transition-colors duration-300">
          <Icon name="Download" size={16} />
          <span className="hidden md:inline">Export</span>
        </button>
      </div>
      <div className="space-y-4 md:space-y-6">
        {patterns?.map((pattern, index) => (
          <div key={pattern?.id} className="relative">
            {index !== patterns?.length - 1 && (
              <div className="absolute left-4 md:left-5 top-12 md:top-14 bottom-0 w-0.5 bg-border" />
            )}
            
            <div className="flex gap-3 md:gap-4">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${getSeverityColor(pattern?.severity)} flex items-center justify-center flex-shrink-0 relative z-10`}>
                <Icon name={getSeverityIcon(pattern?.severity)} size={16} />
              </div>

              <div className="flex-1 bg-muted rounded-lg p-3 md:p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="text-sm md:text-base font-semibold text-foreground">{pattern?.patternName}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{pattern?.timestamp}</span>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{pattern?.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
                  <div className="bg-card rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Occurrences</p>
                    <p className="text-sm md:text-base font-bold text-foreground">{pattern?.occurrences}</p>
                  </div>
                  <div className="bg-card rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Amount</p>
                    <p className="text-sm md:text-base font-bold text-foreground">${pattern?.totalAmount}</p>
                  </div>
                  <div className="bg-card rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Accounts</p>
                    <p className="text-sm md:text-base font-bold text-foreground">{pattern?.affectedAccounts}</p>
                  </div>
                  <div className="bg-card rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Detection</p>
                    <p className="text-sm md:text-base font-bold text-foreground">{pattern?.detectionRate}%</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {pattern?.tags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-primary rounded text-xs font-medium text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FraudPatternTimeline;