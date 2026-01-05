import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReportsSection = () => {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const reportTemplates = [
    {
      id: 1,
      name: "SOC 2 Compliance Report",
      description: "Comprehensive security and availability controls documentation",
      frequency: "Quarterly",
      lastGenerated: "2025-12-15",
      icon: "ShieldCheck",
      status: "Ready"
    },
    {
      id: 2,
      name: "PCI DSS Assessment",
      description: "Payment card industry data security standard compliance report",
      frequency: "Annual",
      lastGenerated: "2025-11-30",
      icon: "CreditCard",
      status: "Ready"
    },
    {
      id: 3,
      name: "GDPR Data Processing",
      description: "General data protection regulation processing activities record",
      frequency: "Monthly",
      lastGenerated: "2025-12-01",
      icon: "Database",
      status: "Scheduled"
    },
    {
      id: 4,
      name: "ISO 27001 Audit Trail",
      description: "Information security management system audit documentation",
      frequency: "Quarterly",
      lastGenerated: "2025-12-10",
      icon: "FileText",
      status: "Ready"
    },
    {
      id: 5,
      name: "Regulatory Change Impact",
      description: "Analysis of new regulatory requirements and implementation status",
      frequency: "Ad-hoc",
      lastGenerated: "2025-12-18",
      icon: "AlertCircle",
      status: "Ready"
    },
    {
      id: 6,
      name: "Compliance Gap Analysis",
      description: "Identification of compliance gaps and remediation recommendations",
      frequency: "Quarterly",
      lastGenerated: "2025-12-12",
      icon: "Target",
      status: "In Progress"
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: "Monthly GDPR Report",
      scheduledDate: "2026-01-01",
      recipients: "compliance@fraudguardpro.com",
      status: "Scheduled"
    },
    {
      id: 2,
      name: "Q1 2026 SOC 2 Report",
      scheduledDate: "2026-01-15",
      recipients: "audit-team@fraudguardpro.com",
      status: "Scheduled"
    },
    {
      id: 3,
      name: "Weekly Audit Summary",
      scheduledDate: "2025-12-27",
      recipients: "security@fraudguardpro.com",
      status: "Scheduled"
    }
  ];

  const reportTypeOptions = [
    { value: 'soc2', label: 'SOC 2 Compliance' },
    { value: 'pci', label: 'PCI DSS Assessment' },
    { value: 'gdpr', label: 'GDPR Data Processing' },
    { value: 'iso', label: 'ISO 27001 Audit' },
    { value: 'gap', label: 'Gap Analysis' }
  ];

  const periodOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Select
            label="Report Type"
            placeholder="Select report type"
            options={reportTypeOptions}
            value={selectedReportType}
            onChange={setSelectedReportType}
            searchable
          />
          <Select
            label="Time Period"
            placeholder="Select period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
          <div className="flex items-end">
            <Button 
              variant="default" 
              iconName="FileText" 
              iconPosition="left"
              fullWidth
              disabled={!selectedReportType || !selectedPeriod}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Report Templates</h2>
          <Button variant="outline" iconName="Plus" iconPosition="left" size="sm">
            Create Template
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reportTemplates?.map((template) => (
            <div key={template?.id} className="bg-muted rounded-lg p-4 hover:bg-primary/10 transition-colors duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                  <Icon name={template?.icon} size={24} color="var(--color-info)" />
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  template?.status === 'Ready' ? 'bg-success/10 text-success' :
                  template?.status === 'Scheduled'? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'
                }`}>
                  {template?.status}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {template?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {template?.description}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Frequency: {template?.frequency}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>Last: {template?.lastGenerated}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" iconName="Download" fullWidth>
                  Download
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye" fullWidth>
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Scheduled Reports</h2>
          <Icon name="Calendar" size={24} color="var(--color-accent)" />
        </div>
        <div className="space-y-4">
          {scheduledReports?.map((report) => (
            <div key={report?.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-300">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={20} color="var(--color-warning)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1">{report?.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>{report?.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Mail" size={12} />
                      <span className="truncate">{report?.recipients}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="sm" iconName="Edit2">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Trash2">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;