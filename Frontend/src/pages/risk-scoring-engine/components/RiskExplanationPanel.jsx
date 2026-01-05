import React from 'react';
import Icon from '@/components/AppIcon';

const RiskExplanationPanel = ({ factors }) => {
  const getImpactColor = (impact) => {
    if (impact >= 70) return 'text-red-400';
    if (impact >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getImpactBg = (impact) => {
    if (impact >= 70) return 'bg-red-500/20';
    if (impact >= 40) return 'bg-yellow-500/20';
    return 'bg-green-500/20';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon name="Info" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Risk Score Breakdown</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Contributing factors and their impact</p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {factors?.map((factor, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-3 md:p-4 hover:bg-muted transition-colors">
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className={`w-8 h-8 rounded-lg ${getImpactBg(factor?.impact)} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={factor?.icon} size={16} color={getImpactColor(factor?.impact)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs md:text-sm font-semibold text-foreground">{factor?.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{factor?.description}</p>
                </div>
              </div>
              <span className={`text-base md:text-lg font-bold ${getImpactColor(factor?.impact)} ml-2 flex-shrink-0`}>
                +{factor?.impact}
              </span>
            </div>
            
            <div className="relative w-full h-2 bg-background rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                  factor?.impact >= 70 ? 'bg-red-500' : factor?.impact >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${factor?.impact}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">{factor?.reason}</span>
              <span className={`text-xs font-medium ${getImpactColor(factor?.impact)}`}>
                {factor?.impact >= 70 ? 'Critical' : factor?.impact >= 40 ? 'Moderate' : 'Minor'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Risk Score</span>
          <span className="text-xl md:text-2xl font-bold text-accent">
            {factors?.reduce((sum, f) => sum + f?.impact, 0)}/100
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskExplanationPanel;