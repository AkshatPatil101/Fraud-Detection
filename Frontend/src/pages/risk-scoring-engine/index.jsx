import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Icon from '@/components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import RiskScoreCard from './components/RiskScoreCard';
import RiskFactorSlider from './components/RiskFactorSlider';
import ScenarioTestCard from './components/ScenarioTestCard';
import RiskTrendChart from './components/RiskTrendChart';
import BatchAssessmentTable from './components/BatchAssessmentTable';
import RiskExplanationPanel from './components/RiskExplanationPanel';
import ThresholdConfigPanel from './components/ThresholdConfigPanel';

const RiskScoringEngine = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  const [riskFactors, setRiskFactors] = useState({
    transactionAmount: 65,
    transactionFrequency: 45,
    locationAnomaly: 80,
    deviceFingerprint: 30,
    accountAge: 20,
    behaviorPattern: 55
  });

  const [thresholds, setThresholds] = useState({
    lowRisk: 30,
    mediumRisk: 60,
    highRisk: 80
  });

  const riskScoreData = [
    { score: 42, label: "Average Risk Score", trend: "down", trendValue: "8%", color: "warning", icon: "TrendingDown" },
    { score: 156, label: "High Risk Transactions", trend: "down", trendValue: "12%", color: "error", icon: "AlertTriangle" },
    { score: 2847, label: "Low Risk Transactions", trend: "up", trendValue: "15%", color: "success", icon: "CheckCircle" },
    { score: "94.2%", label: "Accuracy Rate", trend: "up", trendValue: "2%", color: "success", icon: "Target" }
  ];

  const trendData = [
    { date: "Dec 13", avgScore: 45, highRisk: 18, lowRisk: 82 },
    { date: "Dec 14", avgScore: 48, highRisk: 22, lowRisk: 78 },
    { date: "Dec 15", avgScore: 43, highRisk: 16, lowRisk: 84 },
    { date: "Dec 16", avgScore: 41, highRisk: 15, lowRisk: 85 },
    { date: "Dec 17", avgScore: 39, highRisk: 12, lowRisk: 88 },
    { date: "Dec 18", avgScore: 42, highRisk: 14, lowRisk: 86 },
    { date: "Dec 19", avgScore: 40, highRisk: 13, lowRisk: 87 }
  ];

  const scenarios = [
    {
      id: 1,
      name: "Large International Transfer",
      description: "High-value transaction to a new international recipient",
      icon: "Globe",
      parameters: [
        { label: "Amount", value: "$15,000" },
        { label: "Destination", value: "Nigeria" },
        { label: "Account Age", value: "3 months" },
        { label: "Previous International", value: "No" }
      ]
    },
    {
      id: 2,
      name: "Rapid Multiple Transactions",
      description: "Multiple transactions within short time window",
      icon: "Zap",
      parameters: [
        { label: "Transaction Count", value: "8" },
        { label: "Time Window", value: "15 minutes" },
        { label: "Total Amount", value: "$4,500" },
        { label: "Different Merchants", value: "Yes" }
      ]
    },
    {
      id: 3,
      name: "New Device Login",
      description: "Login from unrecognized device and location",
      icon: "Smartphone",
      parameters: [
        { label: "Device", value: "New Android" },
        { label: "Location", value: "Moscow, Russia" },
        { label: "Time", value: "3:00 AM" },
        { label: "VPN Detected", value: "Yes" }
      ]
    }
  ];

  const transactions = [
    { id: 1, transactionId: "TXN-2025-001", userId: "USR-4521", amount: 12500, riskScore: 78, timestamp: "2025-12-20 10:30:00" },
    { id: 2, transactionId: "TXN-2025-002", userId: "USR-8934", amount: 450, riskScore: 25, timestamp: "2025-12-20 10:25:00" },
    { id: 3, transactionId: "TXN-2025-003", userId: "USR-2341", amount: 8900, riskScore: 62, timestamp: "2025-12-20 10:20:00" },
    { id: 4, transactionId: "TXN-2025-004", userId: "USR-7823", amount: 3200, riskScore: 45, timestamp: "2025-12-20 10:15:00" },
    { id: 5, transactionId: "TXN-2025-005", userId: "USR-1092", amount: 15600, riskScore: 85, timestamp: "2025-12-20 10:10:00" },
    { id: 6, transactionId: "TXN-2025-006", userId: "USR-5647", amount: 720, riskScore: 18, timestamp: "2025-12-20 10:05:00" }
  ];

  const riskExplanationFactors = [
    {
      name: "Transaction Amount",
      description: "Unusually high transaction value compared to user history",
      impact: 25,
      icon: "DollarSign",
      reason: "$12,500 vs avg $450"
    },
    {
      name: "Location Anomaly",
      description: "Transaction from new geographic location",
      impact: 30,
      icon: "MapPin",
      reason: "First transaction from Nigeria"
    },
    {
      name: "Device Fingerprint",
      description: "Unrecognized device characteristics detected",
      impact: 15,
      icon: "Smartphone",
      reason: "New device signature"
    },
    {
      name: "Time Pattern",
      description: "Transaction outside normal activity hours",
      impact: 8,
      icon: "Clock",
      reason: "3:00 AM vs usual 9AM-6PM"
    }
  ];

  const handleFactorChange = (factor, value) => {
    setRiskFactors(prev => ({
      ...prev,
      [factor]: value
    }));
  };

  const handleScenarioTest = (scenario) => {
    const baseScore = Math.floor(Math.random() * 40 + 40);
    return {
      riskScore: baseScore,
      processingTime: Math.floor(Math.random() * 50 + 10),
      recommendation: baseScore >= 70 ? 'Block Transaction' : baseScore >= 40 ? 'Manual Review' : 'Approve'
    };
  };

  const handleBatchAssess = (selectedIds) => {
    console.log('Assessing transactions:', selectedIds);
  };

  const handleThresholdUpdate = (newThresholds) => {
    setThresholds(newThresholds);
  };

  const handleThresholdReset = () => {
    setThresholds({
      lowRisk: 30,
      mediumRisk: 60,
      highRisk: 80
    });
  };

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'factors', label: 'Risk Factors', icon: 'Sliders' },
    { id: 'scenarios', label: 'Scenario Testing', icon: 'TestTube' },
    { id: 'batch', label: 'Batch Assessment', icon: 'Database' },
    { id: 'thresholds', label: 'Thresholds', icon: 'Settings' }
  ];

  return (
    <>
      <Helmet>
        <title>Risk Scoring Engine - FraudGuard Pro</title>
        <meta name="description" content="Advanced risk scoring engine with configurable parameters, scenario testing, and real-time transaction assessment for fraud prevention" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className={`main-content with-header ${sidebarCollapsed ? 'with-sidebar-collapsed' : 'with-sidebar'} flex-1`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <Breadcrumbs />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">Risk Scoring Engine</h1>
                <p className="text-sm md:text-base text-muted-foreground">Configure risk parameters and test scoring scenarios</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select
                  options={timeRangeOptions}
                  value={timeRange}
                  onChange={setTimeRange}
                  className="w-full sm:w-48"
                />
                <Button variant="default" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
              </div>
            </div>

            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                      activeTab === tab?.id
                        ? 'bg-primary text-accent' :'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {riskScoreData?.map((data, index) => (
                    <RiskScoreCard key={index} {...data} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <RiskTrendChart data={trendData} title="Risk Score Trends" />
                  </div>
                  <div>
                    <RiskExplanationPanel factors={riskExplanationFactors} />
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Info" size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground">Quick Insights</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Key metrics and recommendations</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="TrendingDown" size={18} color="var(--color-success)" />
                        <span className="text-sm font-semibold text-foreground">Risk Reduction</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Average risk scores decreased by 8% this week through optimized thresholds</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Target" size={18} color="var(--color-accent)" />
                        <span className="text-sm font-semibold text-foreground">Accuracy Improvement</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Detection accuracy improved to 94.2% with recent model updates</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'factors' && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon name="Sliders" size={20} color="var(--color-accent)" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-foreground">Risk Factor Weighting</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">Adjust the impact of each risk factor</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" iconName="RotateCcw">
                      Reset All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <RiskFactorSlider
                      factor="Transaction Amount"
                      value={riskFactors?.transactionAmount}
                      onChange={(value) => handleFactorChange('transactionAmount', value)}
                      description="Weight given to unusual transaction amounts"
                      icon="DollarSign"
                    />
                    <RiskFactorSlider
                      factor="Transaction Frequency"
                      value={riskFactors?.transactionFrequency}
                      onChange={(value) => handleFactorChange('transactionFrequency', value)}
                      description="Impact of rapid transaction patterns"
                      icon="Zap"
                    />
                    <RiskFactorSlider
                      factor="Location Anomaly"
                      value={riskFactors?.locationAnomaly}
                      onChange={(value) => handleFactorChange('locationAnomaly', value)}
                      description="Weight for geographic inconsistencies"
                      icon="MapPin"
                    />
                    <RiskFactorSlider
                      factor="Device Fingerprint"
                      value={riskFactors?.deviceFingerprint}
                      onChange={(value) => handleFactorChange('deviceFingerprint', value)}
                      description="Impact of unrecognized devices"
                      icon="Smartphone"
                    />
                    <RiskFactorSlider
                      factor="Account Age"
                      value={riskFactors?.accountAge}
                      onChange={(value) => handleFactorChange('accountAge', value)}
                      description="Weight for new account risk"
                      icon="Calendar"
                    />
                    <RiskFactorSlider
                      factor="Behavior Pattern"
                      value={riskFactors?.behaviorPattern}
                      onChange={(value) => handleFactorChange('behaviorPattern', value)}
                      description="Impact of unusual user behavior"
                      icon="Activity"
                    />
                  </div>
                </div>

                <div className="bg-primary/10 rounded-xl border border-primary/30 p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Optimization Tips</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={14} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                          <span>Higher weights on location anomaly and device fingerprint improve detection of account takeovers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={14} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                          <span>Balance transaction amount weight to avoid false positives on legitimate large purchases</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={14} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                          <span>Test changes in sandbox before applying to production scoring</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scenarios' && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="TestTube" size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground">Scenario Testing Sandbox</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Test risk scoring with predefined scenarios</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {scenarios?.map((scenario) => (
                      <ScenarioTestCard
                        key={scenario?.id}
                        scenario={scenario}
                        onTest={handleScenarioTest}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-4">Custom Scenario Builder</h4>
                    <p className="text-xs text-muted-foreground mb-4">Create and test custom fraud scenarios</p>
                    <Button variant="default" iconName="Plus" iconPosition="left" fullWidth>
                      Create Custom Scenario
                    </Button>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-4">Recent Test Results</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-xs text-muted-foreground">Large Transfer Test</span>
                        <span className="text-sm font-bold text-red-400">Score: 78</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-xs text-muted-foreground">Rapid Transactions</span>
                        <span className="text-sm font-bold text-yellow-400">Score: 65</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-xs text-muted-foreground">New Device Login</span>
                        <span className="text-sm font-bold text-green-400">Score: 32</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'batch' && (
              <div className="space-y-6">
                <BatchAssessmentTable
                  transactions={transactions}
                  onAssess={handleBatchAssess}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Database" size={18} color="var(--color-accent)" />
                      <span className="text-sm font-semibold text-foreground">Total Transactions</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{transactions?.length}</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Clock" size={18} color="var(--color-warning)" />
                      <span className="text-sm font-semibold text-foreground">Avg Processing Time</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">45ms</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="CheckCircle" size={18} color="var(--color-success)" />
                      <span className="text-sm font-semibold text-foreground">Success Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">99.8%</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'thresholds' && (
              <div className="space-y-6">
                <ThresholdConfigPanel
                  thresholds={thresholds}
                  onUpdate={handleThresholdUpdate}
                  onReset={handleThresholdReset}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-4">Current Distribution</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">Low Risk (0-{thresholds?.lowRisk})</span>
                          <span className="text-sm font-bold text-green-400">2,847 transactions</span>
                        </div>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '71%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">Medium Risk ({thresholds?.lowRisk}-{thresholds?.mediumRisk})</span>
                          <span className="text-sm font-bold text-yellow-400">892 transactions</span>
                        </div>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '22%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">High Risk ({thresholds?.mediumRisk}+)</span>
                          <span className="text-sm font-bold text-red-400">156 transactions</span>
                        </div>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: '7%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-4">Threshold History</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Dec 15, 2025</p>
                          <p className="text-sm text-foreground">Adjusted high risk threshold</p>
                        </div>
                        <span className="text-xs font-medium text-accent">80 → 75</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Dec 10, 2025</p>
                          <p className="text-sm text-foreground">Updated medium threshold</p>
                        </div>
                        <span className="text-xs font-medium text-accent">55 → 60</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Dec 5, 2025</p>
                          <p className="text-sm text-foreground">Reset to defaults</p>
                        </div>
                        <span className="text-xs font-medium text-accent">System</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RiskScoringEngine;