import React from 'react';
import Icon from '@/components/AppIcon';

const RiskFactorSlider = ({ factor, value, onChange, min = 0, max = 100, description, icon }) => {
  const getImpactColor = () => {
    if (value >= 70) return 'text-red-400';
    if (value >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getImpactLabel = () => {
    if (value >= 70) return 'High Impact';
    if (value >= 40) return 'Medium Impact';
    return 'Low Impact';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name={icon} size={18} color="var(--color-accent)" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{factor}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="text-right ml-2 md:ml-4 flex-shrink-0">
          <p className={`text-xl md:text-2xl font-bold ${getImpactColor()}`}>{value}%</p>
          <p className={`text-xs ${getImpactColor()}`}>{getImpactLabel()}</p>
        </div>
      </div>
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e?.target?.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${value}%, var(--color-muted) ${value}%, var(--color-muted) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low ({min}%)</span>
          <span>High ({max}%)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskFactorSlider;