import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';

const ThreatIntelligenceReport = ({ reports }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-error';
      case 'High':
        return 'text-warning';
      case 'Medium':
        return 'text-info';
      default:
        return 'text-success';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-error';
      case 'High':
        return 'bg-warning';
      case 'Medium':
        return 'bg-info';
      default:
        return 'bg-success';
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Weekly Threat Intelligence Reports</h2>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary hover:bg-secondary rounded-lg text-xs md:text-sm font-medium text-accent transition-colors duration-300">
          <Icon name="Bell" size={16} />
          <span className="hidden md:inline">Subscribe</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {reports?.map((report) => (
          <div key={report?.id} className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-40 md:h-48 overflow-hidden">
              <Image
                src={report?.image}
                alt={report?.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 right-3 px-3 py-1 ${getPriorityBg(report?.priority)} rounded-full text-xs font-bold text-foreground`}>
                {report?.priority}
              </div>
            </div>

            <div className="p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                <span className="text-xs text-muted-foreground">{report?.publishDate}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{report?.readTime}</span>
              </div>

              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {report?.title}
              </h3>

              <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-3">
                {report?.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {report?.tags?.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-card rounded text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-card rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Incidents</p>
                  <p className="text-sm md:text-base font-bold text-foreground">{report?.incidents}</p>
                </div>
                <div className="bg-card rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Affected</p>
                  <p className="text-sm md:text-base font-bold text-foreground">{report?.affected}</p>
                </div>
                <div className="bg-card rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Loss</p>
                  <p className="text-sm md:text-base font-bold text-foreground">${report?.estimatedLoss}</p>
                </div>
              </div>

              <button className="w-full py-2 px-4 bg-primary hover:bg-secondary rounded-lg text-sm font-medium text-accent transition-colors duration-300 flex items-center justify-center gap-2">
                <span>Read Full Report</span>
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatIntelligenceReport;