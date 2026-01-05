import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ResultsDisplayCard = ({ results, backendData, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (results) {
      const element = document.getElementById('results-card');
      if (element) {
        setTimeout(() => {
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [results]);

  if (!results) return null;

  // --- MANUAL RISK LEVEL ASSIGNMENT ---
  const getRiskInfo = (decimalScore) => {
    const score = decimalScore * 100;
    if (score >= 85) return { level: 'CRITICAL', icon: 'AlertTriangle', color: '#7f1d1d' };
    if (score >= 36) return { level: 'HIGH', icon: 'AlertTriangle', color: '#ef4444' };
    if (score >= 25) return { level: 'MEDIUM', icon: 'AlertCircle', color: '#f59e0b' };
    if (score >= 0) return { level: 'LOW', icon: 'CheckCircle2', color: '#22c55e' };
    return { level: 'NEGLIGIBLE', icon: 'ShieldCheck', color: '#15803d' };
  };

  const riskInfo = getRiskInfo(backendData.final_score);

  return (
    <div id="results-card" className="results-display-card">
      <div 
        className="results-display-card-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ backgroundColor: riskInfo.color }} // Dynamic header color
      >
        <div className="results-display-card-header-content">
          <div className="results-display-card-header-icon">
            <Icon name={riskInfo.icon} size={32} color="#FFFFFF" strokeWidth={2} />
          </div>
          <div className="results-display-card-header-text">
            <h2 className="results-display-card-header-title">
              Fraud Detection Results
            </h2>
            <p className="results-display-card-header-subtitle">
              Analysis completed on {new Date()?.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={24} 
          color="#FFFFFF"
        />
      </div>
      
      {isExpanded && (
        <div className="results-display-card-body">
          <div className="results-display-card-score">
            <span className="results-display-card-score-label">Fraud Risk Score</span>
            <span 
              className="results-display-card-score-value" 
              style={{ color: riskInfo.color }}
            >
              {(backendData.final_score * 100).toFixed(2)}%
            </span>
          </div>

          <div className="results-display-card-details">
            <div className="results-display-card-detail-item">
              <div className="results-display-card-detail-icon">
                <Icon name="Target" size={20} color={riskInfo.color} />
              </div>
              <div className="results-display-card-detail-content">
                <p className="results-display-card-detail-label">Risk Level</p>
                <p className="results-display-card-detail-value font-semibold" style={{ color: riskInfo.color }}>
                  {riskInfo.level} RISK
                </p>
              </div>
            </div>

            <div className="results-display-card-detail-item">
              <div className="results-display-card-detail-icon">
               <Icon 
  name={backendData.decision.includes("FRAUD") ? 'XCircle' : 'CheckCircle2'} 
  size={20} 
  color={riskInfo.color} 
/>
              </div>
              <div className="results-display-card-detail-content">
                <p className="results-display-card-detail-label">Transaction Status</p>
                <p className="results-display-card-detail-value font-semibold" style={{ color: riskInfo.color }}>
                  {backendData.decision} TRANSACTION
                </p>
              </div>
            </div>

            {results?.reasoning && (
              <div className="results-display-card-detail-item">
                <div className="results-display-card-detail-icon">
                  <Icon name="FileText" size={20} color="var(--color-muted-foreground)" />
                </div>
                <div className="results-display-card-detail-content">
                  <p className="results-display-card-detail-label">Analysis Details</p>
                  <p className="results-display-card-detail-value">
                    Transaction appears as {(backendData.decision)}
                  </p>
                </div>
              </div>
            )}

            {results?.recommendations && results?.recommendations?.length > 0 && (
              <div className="results-display-card-detail-item">
                <div className="results-display-card-detail-icon">
                  <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
                </div>
                <div className="results-display-card-detail-content">
                  <p className="results-display-card-detail-label">Recommendations</p>
                  <ul className="space-y-2 mt-2">
                    {results?.recommendations?.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={16} className="flex-shrink-0 mt-1 text-muted-foreground" />
                        <span className="results-display-card-detail-value">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {onClose && (
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                iconName="X"
                iconPosition="left"
              >
                Close Results
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplayCard;