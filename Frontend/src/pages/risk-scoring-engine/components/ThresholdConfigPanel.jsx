import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';

const ThresholdConfigPanel = ({ thresholds, onUpdate, onReset }) => {
  const [localThresholds, setLocalThresholds] = React.useState(thresholds);

  const handleThresholdChange = (key, value) => {
    setLocalThresholds(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleSave = () => {
    onUpdate(localThresholds);
  };

  const handleResetLocal = () => {
    onReset();
    setLocalThresholds(thresholds);
  };

  const thresholdConfigs = [
    {
      key: 'lowRisk',
      label: 'Low Risk Threshold',
      description: 'Transactions below this score are considered low risk',
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      key: 'mediumRisk',
      label: 'Medium Risk Threshold',
      description: 'Transactions between low and high thresholds',
      icon: 'AlertCircle',
      color: 'yellow'
    },
    {
      key: 'highRisk',
      label: 'High Risk Threshold',
      description: 'Transactions above this score require immediate review',
      icon: 'XCircle',
      color: 'red'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="Settings" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Threshold Configuration</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Adjust risk scoring thresholds</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleResetLocal} iconName="RotateCcw">
            Reset
          </Button>
          <Button variant="default" size="sm" onClick={handleSave} iconName="Save">
            Save
          </Button>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        {thresholdConfigs?.map((config) => (
          <div key={config?.key} className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                config?.color === 'green' ? 'bg-green-500/20' : 
                config?.color === 'yellow'? 'bg-yellow-500/20' : 'bg-red-500/20'
              }`}>
                <Icon 
                  name={config?.icon} 
                  size={18} 
                  color={
                    config?.color === 'green' ? 'var(--color-success)' : 
                    config?.color === 'yellow' ? 'var(--color-warning)' : 
                    'var(--color-error)'
                  } 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">{config?.label}</h4>
                <p className="text-xs text-muted-foreground">{config?.description}</p>
              </div>
              <span className={`text-xl font-bold flex-shrink-0 ${
                config?.color === 'green' ? 'text-green-400' : 
                config?.color === 'yellow'? 'text-yellow-400' : 'text-red-400'
              }`}>
                {localThresholds?.[config?.key]}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={localThresholds?.[config?.key]}
              onChange={(e) => handleThresholdChange(config?.key, e?.target?.value)}
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${
                  config?.color === 'green' ? 'var(--color-success)' : 
                  config?.color === 'yellow' ? 'var(--color-warning)' : 
                  'var(--color-error)'
                } 0%, ${
                  config?.color === 'green' ? 'var(--color-success)' : 
                  config?.color === 'yellow' ? 'var(--color-warning)' : 
                  'var(--color-error)'
                } ${localThresholds?.[config?.key]}%, var(--color-background) ${localThresholds?.[config?.key]}%, var(--color-background) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm text-foreground font-medium mb-1">Impact Preview</p>
            <p className="text-xs text-muted-foreground">
              Changes will affect {Math.floor(Math.random() * 500 + 100)} pending transactions. Review carefully before saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThresholdConfigPanel;