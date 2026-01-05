import React from 'react';
import Icon from '@/components/AppIcon';

const ComplianceHeader = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'reports', label: 'Reports', icon: 'FileText' },
    { id: 'audit-trail', label: 'Audit Trail', icon: 'History' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' }
  ];

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Compliance Reporting Center
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Automated regulatory reporting and comprehensive audit trail management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg">
            <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
            <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">Last Updated: Dec 20, 2025</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              activeTab === tab?.id
                ? 'bg-primary text-accent' :'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComplianceHeader;