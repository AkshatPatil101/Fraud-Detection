import React from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onAssignBulk, onResolveBulk, onEscalateBulk, onClearSelection }) => {
  const assigneeOptions = [
    { value: 'analyst1', label: 'Sarah Chen - Senior Analyst' },
    { value: 'analyst2', label: 'Michael Rodriguez - Fraud Specialist' },
    { value: 'analyst3', label: 'Emily Watson - Risk Analyst' },
    { value: 'analyst4', label: 'David Kim - Security Expert' }
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-4xl px-4">
      <div className="bg-primary border border-accent rounded-lg shadow-2xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Icon name="CheckSquare" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <p className="text-sm font-semibold text-accent">
                {selectedCount} Alert{selectedCount > 1 ? 's' : ''} Selected
              </p>
              <p className="text-xs text-accent/70">Choose a bulk action below</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              options={assigneeOptions}
              onChange={onAssignBulk}
              placeholder="Assign to..."
              className="w-48"
            />
            <Button 
              variant="success" 
              size="sm" 
              iconName="CheckCircle"
              onClick={onResolveBulk}
            >
              Resolve All
            </Button>
            <Button 
              variant="warning" 
              size="sm" 
              iconName="TrendingUp"
              onClick={onEscalateBulk}
            >
              Escalate
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="X"
              onClick={onClearSelection}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;