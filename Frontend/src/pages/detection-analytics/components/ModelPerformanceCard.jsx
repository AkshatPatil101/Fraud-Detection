import React from 'react';
import Icon from '@/components/AppIcon';

const ModelPerformanceCard = ({ model }) => {
  // Logic to change the color based on the fraud prediction percentage
  const getPredictionColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 36) return 'var(--color-error)';   // Red for Critical
    if (numScore >= 25) return 'var(--color-warning)'; // Yellow/Orange for Medium/High
    return 'var(--color-success)';                    // Green for Low Risk
  };

  const statusColor = getPredictionColor(model.prediction);

  return (
    <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top Icon Section */}
      <div className="mb-4 p-4 bg-muted rounded-full">
        <Icon name={model.icon} size={32} className="text-primary" />
      </div>
      
      {/* Model Name and Subtitle */}
      <h3 className="text-2xl font-bold text-foreground mb-1">{model.name}</h3>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
        {model.type}
      </p>

      {/* Large Prediction Number with Dynamic Color */}
      <div className="mb-8">
        <div className="flex items-baseline justify-center gap-1">
          <span 
            className="text-5xl font-black tracking-tight transition-colors duration-500"
            style={{ color: statusColor }}
          >
            {model.prediction}
          </span>
          <span 
            className="text-xl font-bold transition-colors duration-500"
            style={{ color: statusColor }}
          >
            %
          </span>
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-2">Fraud Probability</p>
      </div>

      {/* Action Button */}
      <button className="w-full py-3 px-4 bg-primary text-accent hover:bg-secondary rounded-lg text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2">
        <Icon name="Settings" size={18} />
        Configure Model
      </button>
    </div>
  );
};

export default ModelPerformanceCard;