import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarSection = () => {
  const [currentDate] = useState(new Date(2025, 11, 20));

  const complianceEvents = [
    {
      id: 1,
      date: "2025-12-22",
      title: "SOC 2 Quarterly Review",
      type: "Review",
      priority: "High",
      description: "Quarterly review of SOC 2 controls and documentation"
    },
    {
      id: 2,
      date: "2025-12-27",
      title: "Weekly Audit Summary",
      type: "Report",
      priority: "Medium",
      description: "Automated weekly audit trail summary generation"
    },
    {
      id: 3,
      date: "2026-01-01",
      title: "Monthly GDPR Report",
      type: "Report",
      priority: "High",
      description: "Monthly GDPR data processing activities report"
    },
    {
      id: 4,
      date: "2026-01-05",
      title: "PCI DSS Scan",
      type: "Scan",
      priority: "High",
      description: "Quarterly PCI DSS vulnerability scan"
    },
    {
      id: 5,
      date: "2026-01-10",
      title: "ISO 27001 Internal Audit",
      type: "Audit",
      priority: "High",
      description: "Internal audit of information security management system"
    },
    {
      id: 6,
      date: "2026-01-15",
      title: "Q1 2026 SOC 2 Report",
      type: "Report",
      priority: "High",
      description: "Quarterly SOC 2 Type II compliance report generation"
    },
    {
      id: 7,
      date: "2026-01-20",
      title: "Compliance Training",
      type: "Training",
      priority: "Medium",
      description: "Mandatory compliance training for all staff members"
    },
    {
      id: 8,
      date: "2026-01-25",
      title: "Risk Assessment Review",
      type: "Review",
      priority: "Medium",
      description: "Monthly risk assessment and mitigation review"
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "SOC 2 Quarterly Review",
      date: "2025-12-22",
      daysRemaining: 2,
      priority: "High"
    },
    {
      id: 2,
      title: "Weekly Audit Summary",
      date: "2025-12-27",
      daysRemaining: 7,
      priority: "Medium"
    },
    {
      id: 3,
      title: "Monthly GDPR Report",
      date: "2026-01-01",
      daysRemaining: 12,
      priority: "High"
    }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const monthYear = currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
      const hasEvent = complianceEvents?.some(event => event?.date === dateStr);
      const isToday = day === 20;

      days?.push(
        <div
          key={day}
          className={`aspect-square p-1 md:p-2 rounded-lg border transition-all duration-300 ${
            isToday ? 'bg-primary border-accent' : hasEvent ?'bg-info/10 border-info hover:bg-info/20': 'bg-muted border-border hover:bg-primary/10'
          }`}
        >
          <div className="flex flex-col h-full">
            <span className={`text-xs md:text-sm font-medium ${
              isToday ? 'text-accent' : 'text-foreground'
            }`}>
              {day}
            </span>
            {hasEvent && (
              <div className="mt-auto">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-info mx-auto" />
              </div>
            )}
          </div>
        </div>
      );
    }

    return { days, monthYear };
  };

  const { days, monthYear } = renderCalendar();

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-card rounded-xl p-4 md:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{monthYear}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" iconName="ChevronLeft">
                Previous
              </Button>
              <Button variant="outline" size="sm" iconName="ChevronRight">
                Next
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
              <div key={day} className="text-center text-xs md:text-sm font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {days}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs md:text-sm text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-info" />
              <span className="text-xs md:text-sm text-muted-foreground">Has Events</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Upcoming Deadlines</h2>
              <Icon name="Clock" size={24} color="var(--color-warning)" />
            </div>
            <div className="space-y-4">
              {upcomingDeadlines?.map((deadline) => (
                <div key={deadline?.id} className="p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 flex-1">
                      {deadline?.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                      deadline?.priority === 'High' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                    }`}>
                      {deadline?.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Icon name="Calendar" size={14} />
                    <span>{deadline?.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-warning">
                    <Icon name="AlertCircle" size={14} />
                    <span>{deadline?.daysRemaining} days remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="outline" iconName="Plus" iconPosition="left" fullWidth>
                Add Event
              </Button>
              <Button variant="outline" iconName="Download" iconPosition="left" fullWidth>
                Export Calendar
              </Button>
              <Button variant="outline" iconName="Bell" iconPosition="left" fullWidth>
                Set Reminder
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">All Compliance Events</h2>
          <Icon name="Calendar" size={24} color="var(--color-accent)" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceEvents?.map((event) => (
            <div key={event?.id} className="p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    event?.type === 'Report' ? 'bg-info/10' :
                    event?.type === 'Audit' ? 'bg-warning/10' :
                    event?.type === 'Review' ? 'bg-success/10' :
                    event?.type === 'Scan' ? 'bg-error/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={
                        event?.type === 'Report' ? 'FileText' :
                        event?.type === 'Audit' ? 'Search' :
                        event?.type === 'Review' ? 'Eye' :
                        event?.type === 'Scan' ? 'Shield' : 'BookOpen'
                      } 
                      size={20} 
                      color={
                        event?.type === 'Report' ? 'var(--color-info)' :
                        event?.type === 'Audit' ? 'var(--color-warning)' :
                        event?.type === 'Review' ? 'var(--color-success)' :
                        event?.type === 'Scan' ? 'var(--color-error)' : 'var(--color-muted-foreground)'
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-1">
                      {event?.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} />
                      <span>{event?.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                  event?.priority === 'High' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                }`}>
                  {event?.priority}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{event?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;