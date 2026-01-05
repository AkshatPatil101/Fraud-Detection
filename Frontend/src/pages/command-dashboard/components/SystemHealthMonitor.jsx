import React from 'react';
import Icon from '@/components/AppIcon';

const SystemHealthMonitor = () => {
  const systems = [
    {
      id: 1,
      name: "ML Detection Engine",
      status: "operational",
      uptime: "99.98%",
      latency: "12ms",
      throughput: "15.2K/sec",
      icon: "Cpu"
    },
    {
      id: 2,
      name: "Rule-Based Engine",
      status: "operational",
      uptime: "99.95%",
      latency: "8ms",
      throughput: "22.8K/sec",
      icon: "Zap"
    },
    {
      id: 3,
      name: "Data Pipeline",
      status: "degraded",
      uptime: "98.12%",
      latency: "45ms",
      throughput: "8.3K/sec",
      icon: "Database"
    },
    {
      id: 4,
      name: "Alert System",
      status: "operational",
      uptime: "99.99%",
      latency: "5ms",
      throughput: "5.1K/sec",
      icon: "Bell"
    },
    {
      id: 5,
      name: "API Gateway",
      status: "operational",
      uptime: "99.97%",
      latency: "18ms",
      throughput: "31.5K/sec",
      icon: "Globe"
    },
    {
      id: 6,
      name: "Analytics Engine",
      status: "maintenance",
      uptime: "95.20%",
      latency: "120ms",
      throughput: "2.1K/sec",
      icon: "TrendingUp"
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'operational':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle2', label: 'Operational' };
      case 'degraded':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'AlertTriangle', label: 'Degraded' };
      case 'maintenance':
        return { color: 'text-accent', bg: 'bg-accent/10', icon: 'Settings', label: 'Maintenance' };
      default:
        return { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle', label: 'Down' };
    }
  };

  const overallHealth = systems?.filter(s => s?.status === 'operational')?.length / systems?.length * 100;

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">System Health Monitor</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Real-time infrastructure status</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Overall Health</p>
            <p className="text-lg md:text-xl font-bold text-success">{overallHealth?.toFixed(1)}%</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-success)" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {systems?.map((system) => {
          const statusConfig = getStatusConfig(system?.status);
          
          return (
            <div
              key={system?.id}
              className="p-4 rounded-lg border border-border hover:border-accent transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name={system?.icon} size={18} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{system?.name}</h4>
                    <div className={`flex items-center gap-1 mt-1 ${statusConfig?.color}`}>
                      <Icon name={statusConfig?.icon} size={12} />
                      <span className="text-xs font-medium">{statusConfig?.label}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                  <p className="text-sm font-semibold text-foreground">{system?.uptime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Latency</p>
                  <p className="text-sm font-semibold text-foreground">{system?.latency}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Throughput</p>
                  <p className="text-sm font-semibold text-foreground">{system?.throughput}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${statusConfig?.bg?.replace('/10', '')} transition-all duration-500`}
                    style={{ width: system?.uptime }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-xs text-muted-foreground">Degraded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">Maintenance</span>
            </div>
          </div>
          <button className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
            View Detailed Metrics →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;