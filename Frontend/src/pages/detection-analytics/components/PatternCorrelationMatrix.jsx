import React from 'react';
import Icon from '@/components/AppIcon';

const PatternCorrelationMatrix = ({ correlations }) => {
  const getCorrelationColor = (value) => {
    if (value >= 0.8) return 'bg-error';
    if (value >= 0.6) return 'bg-warning';
    if (value >= 0.4) return 'bg-info';
    return 'bg-success';
  };

  const getCorrelationIntensity = (value) => {
    const opacity = Math.round(value * 100);
    return { opacity: `${opacity}%` };
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Pattern Correlation Matrix</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Relationship strength between fraud patterns</p>
        </div>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary hover:bg-secondary rounded-lg text-xs md:text-sm font-medium text-accent transition-colors duration-300">
          <Icon name="RefreshCw" size={16} />
          <span>Refresh Data</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-6 gap-1 md:gap-2 mb-2">
            <div className="text-xs md:text-sm font-medium text-muted-foreground" />
            {correlations?.patterns?.map((pattern, idx) => (
              <div key={idx} className="text-xs md:text-sm font-medium text-center text-muted-foreground truncate">
                {pattern}
              </div>
            ))}
          </div>

          {correlations?.matrix?.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-6 gap-1 md:gap-2 mb-1 md:mb-2">
              <div className="text-xs md:text-sm font-medium text-muted-foreground flex items-center truncate">
                {correlations?.patterns?.[rowIdx]}
              </div>
              {row?.map((value, colIdx) => (
                <div
                  key={colIdx}
                  className={`aspect-square rounded ${getCorrelationColor(value)} flex items-center justify-center text-xs font-bold text-foreground cursor-pointer hover:scale-110 transition-transform duration-300`}
                  style={getCorrelationIntensity(value)}
                  title={`Correlation: ${value?.toFixed(2)}`}
                >
                  {value?.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error" />
          <span className="text-xs md:text-sm text-muted-foreground">Strong (0.8+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning" />
          <span className="text-xs md:text-sm text-muted-foreground">Moderate (0.6-0.8)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-info" />
          <span className="text-xs md:text-sm text-muted-foreground">Weak (0.4-0.6)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success" />
          <span className="text-xs md:text-sm text-muted-foreground">Minimal (&lt;0.4)</span>
        </div>
      </div>
    </div>
  );
};

export default PatternCorrelationMatrix;