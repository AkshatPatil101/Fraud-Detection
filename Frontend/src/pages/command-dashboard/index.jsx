import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Icon from '@/components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import ThreatHeatMap from './components/ThreatHeatMap';
import AlertStream from './components/AlertStream';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const CommandDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const metrics = [
    {
      title: "Total Transactions Monitored",
      value: "2.4M",
      change: "+12.5%",
      changeType: "positive",
      icon: "Activity",
      iconColor: "from-primary to-secondary",
      trend: "Trending up"
    },
    {
      title: "Fraud Attempts Blocked",
      value: "1,847",
      change: "+8.3%",
      changeType: "positive",
      icon: "ShieldAlert",
      iconColor: "from-error to-warning",
      trend: "Above average"
    },
    {
      title: "False Positive Rate",
      value: "1.2%",
      change: "-0.4%",
      changeType: "positive",
      icon: "Target",
      iconColor: "from-success to-accent",
      trend: "Improving"
    },
    {
      title: "Detection Accuracy",
      value: "98.7%",
      change: "+0.2%",
      changeType: "positive",
      icon: "TrendingUp",
      iconColor: "from-accent to-primary",
      trend: "Optimal"
    }
  ];

  const timeRanges = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <>
      <Helmet>
        <title>Command Dashboard - FraudGuard Pro</title>
        <meta name="description" content="Real-time fraud monitoring dashboard with customizable risk visualization and instant alert management for comprehensive security oversight." />
      </Helmet>
      <div className="min-h-screen bg-background flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'
        }`}>
          <Header />
          
          <main className="flex-1 pt-16">
            <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
              <Breadcrumbs />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    Command Dashboard
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Real-time fraud detection and security monitoring
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-card rounded-lg p-1 border border-border">
                    {timeRanges?.map((range) => (
                      <button
                        key={range?.value}
                        onClick={() => setTimeRange(range?.value)}
                        className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                          timeRange === range?.value
                            ? 'bg-primary text-accent' :'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {range?.label}
                      </button>
                    ))}
                  </div>
                  
                  <Button variant="outline" iconName="RefreshCw" size="sm">
                    Refresh
                  </Button>
                  
                  <Button variant="default" iconName="Download" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {metrics?.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="lg:col-span-2">
                  <ThreatHeatMap />
                </div>
                <div>
                  <QuickActions />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <AlertStream />
                <RecentActivity />
              </div>

              <div className="mb-6 md:mb-8">
                <SystemHealthMonitor />
              </div>

              <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Lightbulb" size={24} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                        Need Help Getting Started?
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Explore our comprehensive guides and tutorials
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" iconName="BookOpen" size="sm">
                      Documentation
                    </Button>
                    <Button variant="default" iconName="PlayCircle" size="sm">
                      Watch Tutorial
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default CommandDashboard;