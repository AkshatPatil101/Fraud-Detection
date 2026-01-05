import React from 'react';
import Icon from '@/components/AppIcon';

const ComplianceOverview = () => {
  const complianceStats = [
    {
      id: 1,
      title: "Compliance Score",
      value: "98.5%",
      change: "+2.3%",
      trend: "up",
      icon: "TrendingUp",
      color: "success"
    },
    {
      id: 2,
      title: "Active Certifications",
      value: "12",
      change: "+2",
      trend: "up",
      icon: "Award",
      color: "info"
    },
    {
      id: 3,
      title: "Pending Reviews",
      value: "3",
      change: "-5",
      trend: "down",
      icon: "AlertCircle",
      color: "warning"
    },
    {
      id: 4,
      title: "Audit Logs",
      value: "45.2K",
      change: "+12.4K",
      trend: "up",
      icon: "Database",
      color: "info"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "SOC 2 Type II",
      status: "Active",
      expiryDate: "2026-06-15",
      icon: "ShieldCheck",
      description: "Service Organization Control 2 certification for security, availability, and confidentiality"
    },
    {
      id: 2,
      name: "PCI DSS Level 1",
      status: "Active",
      expiryDate: "2026-03-20",
      icon: "CreditCard",
      description: "Payment Card Industry Data Security Standard compliance"
    },
    {
      id: 3,
      name: "ISO 27001",
      status: "Active",
      expiryDate: "2026-09-10",
      icon: "Lock",
      description: "Information Security Management System certification"
    },
    {
      id: 4,
      name: "GDPR Compliant",
      status: "Active",
      expiryDate: "Ongoing",
      icon: "Globe",
      description: "General Data Protection Regulation compliance framework"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Quarterly compliance report generated",
      timestamp: "2025-12-20 10:30:00",
      user: "System Automation",
      type: "report"
    },
    {
      id: 2,
      action: "SOC 2 audit trail exported",
      timestamp: "2025-12-19 15:45:00",
      user: "Sarah Johnson",
      type: "export"
    },
    {
      id: 3,
      action: "PCI DSS compliance check completed",
      timestamp: "2025-12-19 09:20:00",
      user: "Compliance Bot",
      type: "check"
    },
    {
      id: 4,
      action: "New regulatory requirement added",
      timestamp: "2025-12-18 14:10:00",
      user: "Michael Chen",
      type: "update"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {complianceStats?.map((stat) => (
          <div key={stat?.id} className="bg-card rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat?.color}/10`}>
                <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color})`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                stat?.trend === 'up' ? 'bg-success/10' : 'bg-error/10'
              }`}>
                <Icon 
                  name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  color={stat?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
                />
                <span className={`text-xs font-medium ${
                  stat?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {stat?.change}
                </span>
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">{stat?.title}</h3>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat?.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Active Certifications</h2>
            <Icon name="Award" size={24} color="var(--color-accent)" />
          </div>
          <div className="space-y-4">
            {certifications?.map((cert) => (
              <div key={cert?.id} className="p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={cert?.icon} size={20} color="var(--color-success)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base md:text-lg font-semibold text-foreground">{cert?.name}</h3>
                      <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded whitespace-nowrap">
                        {cert?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{cert?.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>Expires: {cert?.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Recent Activity</h2>
            <Icon name="Activity" size={24} color="var(--color-accent)" />
          </div>
          <div className="space-y-4">
            {recentActivity?.map((activity) => (
              <div key={activity?.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={
                      activity?.type === 'report' ? 'FileText' :
                      activity?.type === 'export' ? 'Download' :
                      activity?.type === 'check' ? 'CheckCircle' : 'Bell'
                    } 
                    size={20} 
                    color="var(--color-info)" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-foreground font-medium mb-1 line-clamp-2">
                    {activity?.action}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="User" size={12} />
                      <span>{activity?.user}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>{new Date(activity.timestamp)?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceOverview;