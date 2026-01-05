import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Select from '../../../components/ui/Select';

const AlertStream = () => {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Suspicious Transaction Pattern Detected",
      description: "Multiple high-value transactions from unusual location",
      timestamp: "2 minutes ago",
      source: "ML Detection Engine",
      icon: "AlertOctagon",
      details: { amount: "$45,230", location: "Nigeria", confidence: "98%" }
    },
    {
      id: 2,
      type: "high",
      title: "Account Takeover Attempt",
      description: "Failed login attempts from 5 different IP addresses",
      timestamp: "8 minutes ago",
      source: "Behavioral Analysis",
      icon: "ShieldAlert",
      details: { attempts: "12", timeframe: "15 min", blocked: "Yes" }
    },
    {
      id: 3,
      type: "medium",
      title: "Velocity Check Triggered",
      description: "Transaction frequency exceeds normal pattern",
      timestamp: "15 minutes ago",
      source: "Rule-Based Engine",
      icon: "Activity",
      details: { transactions: "8", period: "1 hour", threshold: "5" }
    },
    {
      id: 4,
      type: "critical",
      title: "Card Testing Activity",
      description: "Multiple small transactions on new card",
      timestamp: "23 minutes ago",
      source: "Pattern Recognition",
      icon: "CreditCard",
      details: { transactions: "15", amounts: "$1-$5", card: "****4532" }
    },
    {
      id: 5,
      type: "high",
      title: "Geolocation Anomaly",
      description: "Transaction from impossible travel location",
      timestamp: "31 minutes ago",
      source: "Geospatial Analysis",
      icon: "MapPin",
      details: { distance: "3,200 mi", time: "45 min", previous: "New York" }
    },
    {
      id: 6,
      type: "medium",
      title: "Device Fingerprint Mismatch",
      description: "New device accessing established account",
      timestamp: "42 minutes ago",
      source: "Device Intelligence",
      icon: "Smartphone",
      details: { device: "Unknown", os: "Android 13", browser: "Chrome" }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return { bg: 'bg-error/10', border: 'border-error', text: 'text-error', badge: 'bg-error' };
      case 'high': return { bg: 'bg-warning/10', border: 'border-warning', text: 'text-warning', badge: 'bg-warning' };
      case 'medium': return { bg: 'bg-accent/10', border: 'border-accent', text: 'text-accent', badge: 'bg-accent' };
      default: return { bg: 'bg-muted', border: 'border-border', text: 'text-muted-foreground', badge: 'bg-muted-foreground' };
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts?.filter(alert => alert?.type === filter);

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">Live Alert Stream</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Real-time fraud detection alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={filterOptions}
            value={filter}
            onChange={setFilter}
            className="w-40"
          />
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Icon name="Settings" size={18} color="var(--color-muted-foreground)" />
          </button>
        </div>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {filteredAlerts?.map((alert) => {
          const colors = getAlertColor(alert?.type);
          
          return (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border ${colors?.border} ${colors?.bg} hover:shadow-lg transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${colors?.badge} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={alert?.icon} size={20} color="var(--color-foreground)" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-foreground">{alert?.title}</h4>
                    <span className={`text-xs font-medium ${colors?.text} uppercase whitespace-nowrap`}>
                      {alert?.type}
                    </span>
                  </div>
                  
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">{alert?.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{alert?.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Cpu" size={14} />
                      <span>{alert?.source}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {Object.entries(alert?.details)?.map(([key, value]) => (
                      <div key={key} className="px-3 py-1 rounded-full bg-background/50 text-xs">
                        <span className="text-muted-foreground capitalize">{key}: </span>
                        <span className="text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Showing {filteredAlerts?.length} of {alerts?.length} alerts
        </span>
        <button className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
          View All Alerts →
        </button>
      </div>
    </div>
  );
};

export default AlertStream;