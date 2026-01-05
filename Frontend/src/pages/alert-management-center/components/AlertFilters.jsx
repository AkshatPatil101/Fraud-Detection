import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

const AlertFilters = ({ filters, onFilterChange, onReset }) => {
  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'escalated', label: 'Escalated' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" iconName="RotateCcw" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search alerts..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => onFilterChange('severity', value)}
          placeholder="Select severity"
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Select status"
        />

        <Select
          options={timeRangeOptions}
          value={filters?.timeRange}
          onChange={(value) => onFilterChange('timeRange', value)}
          placeholder="Select time range"
        />
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Quick Filters</p>
        <div className="flex flex-wrap gap-3">
          <Checkbox
            label="Unassigned Only"
            checked={filters?.unassignedOnly}
            onChange={(e) => onFilterChange('unassignedOnly', e?.target?.checked)}
          />
          <Checkbox
            label="High Priority"
            checked={filters?.highPriority}
            onChange={(e) => onFilterChange('highPriority', e?.target?.checked)}
          />
          <Checkbox
            label="Requires Action"
            checked={filters?.requiresAction}
            onChange={(e) => onFilterChange('requiresAction', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;