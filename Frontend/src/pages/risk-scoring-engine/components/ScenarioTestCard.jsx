import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioTestCard = ({ scenario, onTest }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTest = () => {
    const result = onTest(scenario);
    setTestResult(result);
  };

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskBadge = (score) => {
    if (score >= 70) return { label: 'High Risk', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (score >= 40) return { label: 'Medium Risk', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return { label: 'Low Risk', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name={scenario?.icon} size={20} color="var(--color-accent)" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{scenario?.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{scenario?.description}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0"
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-3 md:space-y-4 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenario?.parameters?.map((param, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">{param?.label}</p>
                <p className="text-sm font-medium text-foreground">{param?.value}</p>
              </div>
            ))}
          </div>

          <Button
            variant="default"
            onClick={handleTest}
            iconName="Play"
            iconPosition="left"
            fullWidth
            className="mt-3"
          >
            Run Scenario Test
          </Button>

          {testResult && (
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/30 mt-3">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-semibold text-foreground">Test Results</h5>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRiskBadge(testResult?.riskScore)?.color}`}>
                  {getRiskBadge(testResult?.riskScore)?.label}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Risk Score</span>
                  <span className={`text-lg font-bold ${getRiskColor(testResult?.riskScore)}`}>
                    {testResult?.riskScore}/100
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Processing Time</span>
                  <span className="text-sm font-medium text-foreground">{testResult?.processingTime}ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Recommendation</span>
                  <span className="text-sm font-medium text-foreground">{testResult?.recommendation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScenarioTestCard;