import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

const AdvancedFilterPanel = ({ onApplyFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '7days',
    severity: [],
    modelType: '',
    minAccuracy: '',
    patternType: []
  });

  const dateRangeOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const modelTypeOptions = [
    { value: '', label: 'All Models' },
    { value: 'neural-network', label: 'Neural Network' },
    { value: 'random-forest', label: 'Random Forest' },
    { value: 'gradient-boosting', label: 'Gradient Boosting' },
    { value: 'logistic-regression', label: 'Logistic Regression' }
  ];

  const severityLevels = ['Critical', 'High', 'Medium', 'Low'];
  const patternTypes = ['Account Takeover', 'Payment Fraud', 'Identity Theft', 'Card Testing', 'Phishing'];

  const handleApply = () => {
    onApplyFilters(filters);
    setIsExpanded(false);
  };

  const handleReset = () => {
    setFilters({
      dateRange: '7days',
      severity: [],
      modelType: '',
      minAccuracy: '',
      patternType: []
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} color="var(--color-accent)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">Advanced Filters</h3>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
          color="var(--color-foreground)" 
        />
      </button>
      {isExpanded && (
        <div className="p-4 md:p-6 border-t border-border space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => setFilters({ ...filters, dateRange: value })}
            />

            <Select
              label="Model Type"
              options={modelTypeOptions}
              value={filters?.modelType}
              onChange={(value) => setFilters({ ...filters, modelType: value })}
            />

            <Input
              label="Minimum Accuracy (%)"
              type="number"
              placeholder="e.g., 90"
              value={filters?.minAccuracy}
              onChange={(e) => setFilters({ ...filters, minAccuracy: e?.target?.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Severity Levels</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {severityLevels?.map((level) => (
                <Checkbox
                  key={level}
                  label={level}
                  checked={filters?.severity?.includes(level)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setFilters({ ...filters, severity: [...filters?.severity, level] });
                    } else {
                      setFilters({ ...filters, severity: filters?.severity?.filter(s => s !== level) });
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Pattern Types</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {patternTypes?.map((type) => (
                <Checkbox
                  key={type}
                  label={type}
                  checked={filters?.patternType?.includes(type)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setFilters({ ...filters, patternType: [...filters?.patternType, type] });
                    } else {
                      setFilters({ ...filters, patternType: filters?.patternType?.filter(t => t !== type) });
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-border">
            <Button variant="default" fullWidth iconName="Check" onClick={handleApply}>
              Apply Filters
            </Button>
            <Button variant="outline" fullWidth iconName="X" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilterPanel;