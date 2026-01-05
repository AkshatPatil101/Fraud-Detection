import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Icon from '@/components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import AlertCard from './components/AlertCard';
import AlertFilters from './components/AlertFilters';
import AlertStats from './components/AlertStats';
import BulkActionsBar from './components/BulkActionsBar';
import InvestigationPanel from './components/InvestigationPanel';
import RealTimeMonitor from './components/RealTimeMonitor';

const AlertManagementCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [investigatingAlert, setInvestigatingAlert] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    status: 'all',
    timeRange: 'all',
    unassignedOnly: false,
    highPriority: false,
    requiresAction: false
  });

  const mockAlerts = [
  {
    id: 'A-2849',
    title: 'Suspicious Multiple Login Attempts',
    description: 'User account showing 15 failed login attempts from 3 different IP addresses within 10 minutes. Potential credential stuffing attack detected.',
    severity: 'critical',
    status: 'new',
    userId: 'USR-78945',
    amount: 0,
    location: 'Moscow, Russia',
    riskScore: 94,
    timestamp: new Date(Date.now() - 300000),
    assignedTo: null,
    notes: []
  },
  {
    id: 'A-2848',
    title: 'Unusual Transaction Pattern',
    description: 'Large transaction ($45,000) initiated from new device in foreign country. User typically transacts $500-2000 domestically.',
    severity: 'high',
    status: 'investigating',
    userId: 'USR-56234',
    amount: 45000,
    location: 'Lagos, Nigeria',
    riskScore: 87,
    timestamp: new Date(Date.now() - 900000),
    assignedTo: {
      name: 'Sarah Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10deca2fb-1763299994309.png",
      avatarAlt: 'Professional Asian woman with long black hair wearing navy blazer and white blouse'
    },
    notes: [
    {
      author: {
        name: 'Sarah Chen',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10deca2fb-1763299994309.png",
        avatarAlt: 'Professional Asian woman with long black hair wearing navy blazer and white blouse'
      },
      content: 'Contacted user via registered phone number. User confirmed they are traveling but did not initiate this transaction. Escalating to fraud team.',
      timestamp: '10:45 AM'
    }]

  },
  {
    id: 'A-2847',
    title: 'Account Takeover Indicators',
    description: 'Email and phone number changed within 24 hours, followed by password reset and immediate fund transfer attempt.',
    severity: 'critical',
    status: 'assigned',
    userId: 'USR-34567',
    amount: 12500,
    location: 'São Paulo, Brazil',
    riskScore: 96,
    timestamp: new Date(Date.now() - 1800000),
    assignedTo: {
      name: 'Michael Rodriguez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1518cd198-1763292620126.png",
      avatarAlt: 'Hispanic man with short black hair and beard wearing dark suit and tie'
    },
    notes: [
    {
      author: {
        name: 'Michael Rodriguez',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1518cd198-1763292620126.png",
        avatarAlt: 'Hispanic man with short black hair and beard wearing dark suit and tie'
      },
      content: 'Account locked. Investigating device fingerprints and IP history. Multiple red flags detected.',
      timestamp: '9:30 AM'
    }]

  },
  {
    id: 'A-2846',
    title: 'Velocity Check Failure',
    description: 'User exceeded daily transaction limit with 8 transactions totaling $23,000 in 2 hours. Normal pattern is 2-3 transactions per day.',
    severity: 'high',
    status: 'new',
    userId: 'USR-89012',
    amount: 23000,
    location: 'New York, USA',
    riskScore: 78,
    timestamp: new Date(Date.now() - 3600000),
    assignedTo: null,
    notes: []
  },
  {
    id: 'A-2845',
    title: 'Geolocation Anomaly',
    description: 'Transaction initiated from Tokyo 30 minutes after previous transaction from London. Physically impossible travel time detected.',
    severity: 'medium',
    status: 'resolved',
    userId: 'USR-45678',
    amount: 3500,
    location: 'Tokyo, Japan',
    riskScore: 72,
    timestamp: new Date(Date.now() - 7200000),
    assignedTo: {
      name: 'Emily Watson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe6c8ca6-1765018512817.png",
      avatarAlt: 'Caucasian woman with blonde hair in professional gray suit with pearl necklace'
    },
    notes: [
    {
      author: {
        name: 'Emily Watson',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe6c8ca6-1765018512817.png",
        avatarAlt: 'Caucasian woman with blonde hair in professional gray suit with pearl necklace'
      },
      content: 'User confirmed VPN usage. Transaction verified as legitimate. Closing alert.',
      timestamp: '8:15 AM'
    }]

  },
  {
    id: 'A-2844',
    title: 'Merchant Category Mismatch',
    description: 'Card used at high-risk merchant category (cryptocurrency exchange) for first time. User profile shows no previous crypto activity.',
    severity: 'medium',
    status: 'investigating',
    userId: 'USR-23456',
    amount: 8000,
    location: 'Singapore',
    riskScore: 65,
    timestamp: new Date(Date.now() - 10800000),
    assignedTo: {
      name: 'David Kim',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c825d348-1763295403719.png",
      avatarAlt: 'Asian man with glasses and short black hair wearing blue business shirt'
    },
    notes: []
  },
  {
    id: 'A-2843',
    title: 'Device Fingerprint Change',
    description: 'New device detected with different browser fingerprint and operating system. User typically uses iOS, new device is Android.',
    severity: 'low',
    status: 'new',
    userId: 'USR-67890',
    amount: 1200,
    location: 'Toronto, Canada',
    riskScore: 58,
    timestamp: new Date(Date.now() - 14400000),
    assignedTo: null,
    notes: []
  },
  {
    id: 'A-2842',
    title: 'Behavioral Pattern Deviation',
    description: 'ML model detected unusual spending pattern. User typically shops at grocery stores and gas stations, now purchasing luxury items.',
    severity: 'low',
    status: 'assigned',
    userId: 'USR-12345',
    amount: 5600,
    location: 'Los Angeles, USA',
    riskScore: 54,
    timestamp: new Date(Date.now() - 18000000),
    assignedTo: {
      name: 'Sarah Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10deca2fb-1763299994309.png",
      avatarAlt: 'Professional Asian woman with long black hair wearing navy blazer and white blouse'
    },
    notes: []
  }];


  const [alerts, setAlerts] = useState(mockAlerts);

  const stats = {
    activeAlerts: 47,
    criticalAlerts: 12,
    resolvedToday: 89,
    avgResponseTime: '8.5 min'
  };

  const filteredAlerts = alerts?.filter((alert) => {
    if (filters?.search && !alert?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !alert?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.severity !== 'all' && alert?.severity !== filters?.severity) return false;
    if (filters?.status !== 'all' && alert?.status !== filters?.status) return false;
    if (filters?.unassignedOnly && alert?.assignedTo) return false;
    if (filters?.highPriority && !['critical', 'high']?.includes(alert?.severity)) return false;
    if (filters?.requiresAction && alert?.status === 'resolved') return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      severity: 'all',
      status: 'all',
      timeRange: 'all',
      unassignedOnly: false,
      highPriority: false,
      requiresAction: false
    });
  };

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts((prev) =>
    prev?.includes(alertId) ?
    prev?.filter((id) => id !== alertId) :
    [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlerts?.length === filteredAlerts?.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(filteredAlerts?.map((alert) => alert?.id));
    }
  };

  const handleViewDetails = (alertId) => {
    const alert = alerts?.find((a) => a?.id === alertId);
    setInvestigatingAlert(alert);
  };

  const handleAssign = (alertId) => {
    console.log('Assigning alert:', alertId);
  };

  const handleResolve = (alertId) => {
    setAlerts((prev) => prev?.map((alert) =>
    alert?.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
  };

  const handleAssignBulk = (assigneeId) => {
    console.log('Bulk assigning to:', assigneeId, selectedAlerts);
    setSelectedAlerts([]);
  };

  const handleResolveBulk = () => {
    setAlerts((prev) => prev?.map((alert) =>
    selectedAlerts?.includes(alert?.id) ? { ...alert, status: 'resolved' } : alert
    ));
    setSelectedAlerts([]);
  };

  const handleEscalateBulk = () => {
    setAlerts((prev) => prev?.map((alert) =>
    selectedAlerts?.includes(alert?.id) ? { ...alert, status: 'escalated', severity: 'critical' } : alert
    ));
    setSelectedAlerts([]);
  };

  const handleAddNote = (alertId, noteText) => {
    setAlerts((prev) => prev?.map((alert) => {
      if (alert?.id === alertId) {
        return {
          ...alert,
          notes: [
          ...alert?.notes,
          {
            author: {
              name: 'Current User',
              avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
              avatarAlt: 'Professional man with short brown hair wearing dark blue suit'
            },
            content: noteText,
            timestamp: new Date()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }]

        };
      }
      return alert;
    }));

    if (investigatingAlert && investigatingAlert?.id === alertId) {
      const updatedAlert = alerts?.find((a) => a?.id === alertId);
      setInvestigatingAlert({
        ...updatedAlert,
        notes: [
        ...updatedAlert?.notes,
        {
          author: {
            name: 'Current User',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
            avatarAlt: 'Professional man with short brown hair wearing dark blue suit'
          },
          content: noteText,
          timestamp: new Date()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }]

      });
    }
  };

  const handleUpdateStatus = (alertId, newStatus) => {
    setAlerts((prev) => prev?.map((alert) =>
    alert?.id === alertId ? { ...alert, status: newStatus } : alert
    ));
    setInvestigatingAlert(null);
  };

  return (
    <>
      <Helmet>
        <title>Alert Management Center - FraudGuard Pro</title>
        <meta name="description" content="Comprehensive suspicious activity tracking with investigation workflows and real-time fraud detection alerts" />
      </Helmet>
      <div className="min-h-screen bg-background flex">
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'}`
        }>
          <Header />
          
          <main className="flex-1 pt-16 px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <Breadcrumbs />

            <div className="mb-6 md:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                    <Icon name="Bell" size={28} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                      Alert Management Center
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Real-time fraud detection and investigation workflows
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('list')}>

                    List
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    iconName="Grid"
                    onClick={() => setViewMode('grid')}>

                    Grid
                  </Button>
                  <Button variant="default" size="sm" iconName="Download">
                    Export
                  </Button>
                </div>
              </div>
            </div>

            <AlertStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 space-y-6">
                <AlertFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters} />


                <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedAlerts?.length === filteredAlerts?.length && filteredAlerts?.length > 0}
                        onChange={handleSelectAll}
                        indeterminate={selectedAlerts?.length > 0 && selectedAlerts?.length < filteredAlerts?.length} />

                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        Active Alerts ({filteredAlerts?.length})
                      </h3>
                    </div>
                    {selectedAlerts?.length > 0 &&
                    <span className="text-sm text-accent font-medium">
                        {selectedAlerts?.length} selected
                      </span>
                    }
                  </div>

                  <div className="space-y-4">
                    {filteredAlerts?.length === 0 ?
                    <div className="text-center py-12">
                        <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                        <p className="text-muted-foreground">No alerts match your filters</p>
                      </div> :

                    filteredAlerts?.map((alert) =>
                    <div key={alert?.id} className="flex items-start gap-3">
                          <Checkbox
                        checked={selectedAlerts?.includes(alert?.id)}
                        onChange={() => handleSelectAlert(alert?.id)}
                        className="mt-6" />

                          <div className="flex-1 min-w-0">
                            <AlertCard
                          alert={alert}
                          onViewDetails={handleViewDetails}
                          onAssign={handleAssign}
                          onResolve={handleResolve} />

                          </div>
                        </div>
                    )
                    }
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <RealTimeMonitor />

                <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
                      Generate Report
                    </Button>
                    <Button variant="outline" fullWidth iconName="Settings" iconPosition="left">
                      Configure Rules
                    </Button>
                    <Button variant="outline" fullWidth iconName="Users" iconPosition="left">
                      Manage Team
                    </Button>
                    <Button variant="outline" fullWidth iconName="TrendingUp" iconPosition="left">
                      View Analytics
                    </Button>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Help & Support</h3>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      <Icon name="BookOpen" size={16} />
                      <span>Investigation Guide</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      <Icon name="Video" size={16} />
                      <span>Training Videos</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      <Icon name="MessageCircle" size={16} />
                      <span>Contact Support</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
      <BulkActionsBar
        selectedCount={selectedAlerts?.length}
        onAssignBulk={handleAssignBulk}
        onResolveBulk={handleResolveBulk}
        onEscalateBulk={handleEscalateBulk}
        onClearSelection={() => setSelectedAlerts([])} />

      {investigatingAlert &&
      <InvestigationPanel
        alert={investigatingAlert}
        onClose={() => setInvestigatingAlert(null)}
        onAddNote={handleAddNote}
        onUpdateStatus={handleUpdateStatus} />

      }
    </>);

};

export default AlertManagementCenter;