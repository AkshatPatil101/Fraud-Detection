import React from 'react';
import Icon from '@/components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Create Alert Rule",
      description: "Configure new detection parameters",
      icon: "Plus",
      color: "from-primary to-secondary",
      action: "create-rule"
    },
    {
      id: 2,
      title: "Review Pending Cases",
      description: "23 cases awaiting investigation",
      icon: "FileSearch",
      color: "from-warning to-accent",
      action: "review-cases",
      badge: "23"
    },
    {
      id: 3,
      title: "Export Dashboard",
      description: "Generate comprehensive report",
      icon: "Download",
      color: "from-accent to-success",
      action: "export-dashboard"
    },
    {
      id: 4,
      title: "System Settings",
      description: "Configure detection thresholds",
      icon: "Settings",
      color: "from-secondary to-primary",
      action: "settings"
    }
  ];

  const shortcuts = [
    { key: "Ctrl + K", action: "Quick Search" },
    { key: "Ctrl + N", action: "New Alert Rule" },
    { key: "Ctrl + E", action: "Export Data" },
    { key: "Ctrl + /", action: "Show Shortcuts" }
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">Quick Actions</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Frequently used operations</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Icon name="MoreVertical" size={18} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
        {actions?.map((action) => (
          <button
            key={action?.id}
            className="relative p-4 rounded-lg text-left hover:scale-105 transition-all duration-300 overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, var(--color-${action?.color?.split(' ')?.[0]?.replace('from-', '')}), var(--color-${action?.color?.split(' ')?.[2]?.replace('to-', '')}))`
            }}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                  <Icon name={action?.icon} size={20} color="var(--color-foreground)" />
                </div>
                {action?.badge && (
                  <span className="px-2 py-1 rounded-full bg-error text-foreground text-xs font-bold">
                    {action?.badge}
                  </span>
                )}
              </div>
              <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{action?.title}</h4>
              <p className="text-xs text-foreground/80">{action?.description}</p>
            </div>
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          </button>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Keyboard Shortcuts</h4>
          <button className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {shortcuts?.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span className="text-xs text-muted-foreground">{shortcut?.action}</span>
              <kbd className="px-2 py-1 rounded bg-background text-xs font-mono text-foreground border border-border">
                {shortcut?.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;