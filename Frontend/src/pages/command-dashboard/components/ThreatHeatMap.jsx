import React, { useState } from 'react';
import Icon from '@/components/AppIcon';

const ThreatHeatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 1, name: "North America", threatLevel: 85, incidents: 1247, color: "from-error to-warning" },
    { id: 2, name: "Europe", threatLevel: 62, incidents: 892, color: "from-warning to-accent" },
    { id: 3, name: "Asia Pacific", threatLevel: 73, incidents: 1056, color: "from-warning to-error" },
    { id: 4, name: "Latin America", threatLevel: 45, incidents: 634, color: "from-success to-warning" },
    { id: 5, name: "Middle East", threatLevel: 58, incidents: 723, color: "from-warning to-accent" },
    { id: 6, name: "Africa", threatLevel: 38, incidents: 412, color: "from-success to-accent" }
  ];

  const getThreatLevelLabel = (level) => {
    if (level >= 80) return { label: "Critical", color: "text-error" };
    if (level >= 60) return { label: "High", color: "text-warning" };
    if (level >= 40) return { label: "Medium", color: "text-accent" };
    return { label: "Low", color: "text-success" };
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">Global Threat Heat Map</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Real-time regional threat distribution</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Icon name="RefreshCw" size={18} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {regions?.map((region) => {
          const threatInfo = getThreatLevelLabel(region?.threatLevel);
          const isSelected = selectedRegion === region?.id;
          
          return (
            <div
              key={region?.id}
              onClick={() => setSelectedRegion(isSelected ? null : region?.id)}
              className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-accent' : ''
              }`}
              style={{
                background: `linear-gradient(135deg, var(--color-${region?.color?.split(' ')?.[0]?.replace('from-', '')}), var(--color-${region?.color?.split(' ')?.[2]?.replace('to-', '')}))`
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{region?.name}</h4>
                  <p className={`text-xs font-medium ${threatInfo?.color}`}>{threatInfo?.label} Risk</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-background/20 flex items-center justify-center">
                  <Icon name="AlertTriangle" size={16} color="var(--color-foreground)" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/80">Threat Level</span>
                  <span className="text-sm font-bold text-foreground">{region?.threatLevel}%</span>
                </div>
                <div className="w-full h-2 bg-background/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-foreground/90 rounded-full transition-all duration-500"
                    style={{ width: `${region?.threatLevel}%` }}
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-foreground/80">Active Incidents</span>
                  <span className="text-sm font-bold text-foreground">{region?.incidents?.toLocaleString()}</span>
                </div>
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-accent/10 rounded-lg pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-xs text-muted-foreground">Critical (80-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">High (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Medium (40-59%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Low (0-39%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatHeatMap;