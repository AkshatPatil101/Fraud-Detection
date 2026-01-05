import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrailSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-12-20 10:45:23",
      user: "Sarah Johnson",
      userRole: "Compliance Officer",
      action: "Generated SOC 2 Report",
      resource: "Compliance Reports",
      ipAddress: "192.168.1.100",
      status: "Success",
      details: "Quarterly SOC 2 Type II compliance report generated and distributed to audit team"
    },
    {
      id: 2,
      timestamp: "2025-12-20 09:30:15",
      user: "Michael Chen",
      userRole: "Security Admin",
      action: "Updated Compliance Policy",
      resource: "Policy Management",
      ipAddress: "192.168.1.105",
      status: "Success",
      details: "Modified data retention policy to align with new GDPR requirements"
    },
    {
      id: 3,
      timestamp: "2025-12-20 08:15:42",
      user: "System Automation",
      userRole: "System",
      action: "Automated Audit Check",
      resource: "Audit System",
      ipAddress: "10.0.0.1",
      status: "Success",
      details: "Daily automated compliance check completed - all systems compliant"
    },
    {
      id: 4,
      timestamp: "2025-12-19 16:20:30",
      user: "Emily Rodriguez",
      userRole: "Risk Analyst",
      action: "Exported Audit Trail",
      resource: "Audit Logs",
      ipAddress: "192.168.1.110",
      status: "Success",
      details: "Exported 30-day audit trail for external audit review"
    },
    {
      id: 5,
      timestamp: "2025-12-19 14:55:18",
      user: "David Kim",
      userRole: "Compliance Manager",
      action: "Failed Login Attempt",
      resource: "Authentication",
      ipAddress: "203.0.113.45",
      status: "Failed",
      details: "Multiple failed login attempts detected - account temporarily locked"
    },
    {
      id: 6,
      timestamp: "2025-12-19 13:40:05",
      user: "Jennifer Lee",
      userRole: "Auditor",
      action: "Reviewed Certification",
      resource: "Certifications",
      ipAddress: "192.168.1.115",
      status: "Success",
      details: "Reviewed and approved ISO 27001 certification renewal documentation"
    },
    {
      id: 7,
      timestamp: "2025-12-19 11:25:50",
      user: "Robert Taylor",
      userRole: "Security Admin",
      action: "Modified Access Control",
      resource: "User Management",
      ipAddress: "192.168.1.120",
      status: "Success",
      details: "Updated role-based access controls for compliance reporting module"
    },
    {
      id: 8,
      timestamp: "2025-12-19 10:10:33",
      user: "System Automation",
      userRole: "System",
      action: "Backup Completed",
      resource: "Data Backup",
      ipAddress: "10.0.0.1",
      status: "Success",
      details: "Automated daily backup of compliance data and audit logs completed"
    }
  ];

  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'report', label: 'Report Generation' },
    { value: 'policy', label: 'Policy Updates' },
    { value: 'export', label: 'Data Export' },
    { value: 'login', label: 'Authentication' },
    { value: 'access', label: 'Access Control' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'sarah', label: 'Sarah Johnson' },
    { value: 'michael', label: 'Michael Chen' },
    { value: 'emily', label: 'Emily Rodriguez' },
    { value: 'system', label: 'System Automation' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Audit Trail Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search audit logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="lg:col-span-2"
          />
          <Select
            placeholder="Filter by action"
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
          />
          <Select
            placeholder="Filter by user"
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
            Export Results
          </Button>
          <Button variant="ghost" iconName="RefreshCw" iconPosition="left" size="sm">
            Refresh
          </Button>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Audit Log Entries</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filteredLogs?.length} of {auditLogs?.length} entries
            </p>
          </div>
          <Icon name="History" size={24} color="var(--color-accent)" />
        </div>

        <div className="space-y-4">
          {filteredLogs?.map((log) => (
            <div key={log?.id} className="p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    log?.status === 'Success' ? 'bg-success/10' : 'bg-error/10'
                  }`}>
                    <Icon 
                      name={log?.status === 'Success' ? 'CheckCircle' : 'XCircle'} 
                      size={20} 
                      color={log?.status === 'Success' ? 'var(--color-success)' : 'var(--color-error)'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-foreground">{log?.action}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        log?.status === 'Success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}>
                        {log?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{log?.details}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={12} />
                        <span className="truncate">{log?.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Shield" size={12} />
                        <span className="truncate">{log?.userRole}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Globe" size={12} />
                        <span className="truncate">{log?.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span className="whitespace-nowrap">{log?.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="Eye">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1-{filteredLogs?.length} of {auditLogs?.length} entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft">
              Previous
            </Button>
            <Button variant="outline" size="sm" iconName="ChevronRight">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailSection;