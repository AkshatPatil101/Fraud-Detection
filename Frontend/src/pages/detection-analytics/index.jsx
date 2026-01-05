import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Icon from '@/components/AppIcon';
import ModelPerformanceCard from './components/ModelPerformanceCard';
import FraudPatternTimeline from './components/FraudPatternTimeline';
import AlgorithmComparison from './components/AlgorithmComparison';
import PatternCorrelationMatrix from './components/PatternCorrelationMatrix';
import PredictiveModelingInterface from './components/PredictiveModelingInterface';
import AdvancedFilterPanel from './components/AdvancedFilterPanel';
import ThreatIntelligenceReport from './components/ThreatIntelligenceReport';

const DetectionAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // 1. Initialize mlModels as state so we can update it with live backend data
  const [mlModels, setMlModels] = useState([
    {
      id: 1,
      name: "XGBoost",
      type: "Extreme Gradient Boosting",
      icon: "Zap",
      prediction: 94.2
    },
    {
      id: 2,
      name: "LightGBM",
      type: "Light Gradient Boosting",
      icon: "Gauge",
      prediction: 91.8
    },
    {
      id: 3,
      name: "CatBoost",
      type: "Categorical Boosting",
      icon: "Cpu",
      prediction: 88.5
    }
  ]);

  // 2. Logic to sync data from localStorage
  const syncLiveScores = () => {
    const savedScores = localStorage.getItem('latest_model_scores');
    if (savedScores) {
      const scores = JSON.parse(savedScores); // This is the {'xgboost': 0.54, ...} object
      
      setMlModels(prevModels => prevModels.map(model => {
        // Match model name (e.g., "XGBoost") to backend key (e.g., "xgboost")
        const key = model.name.toLowerCase();
        if (scores[key] !== undefined) {
          return {
            ...model,
            // Convert decimal (0.5448) to percentage (54.5)
            prediction: (parseFloat(scores[key]) * 100).toFixed(1)
          };
        }
        return model;
      }));
    }
  };

  // 3. Run sync on component mount
  useEffect(() => {
    syncLiveScores();
  }, []);

  const fraudPatterns = [
    {
      id: 1,
      patternName: "Account Takeover Surge",
      severity: "Critical",
      timestamp: "2026-01-05 09:45 AM",
      description: "Detected coordinated account takeover attempts targeting high-value accounts.",
      occurrences: 347,
      totalAmount: "2.4M",
      affectedAccounts: 89,
      detectionRate: 94.2,
      tags: ["Credential Stuffing", "Bot Activity"]
    }
  ];

  const algorithmComparisonData = [
    { algorithm: 'XGBoost', accuracy: 94.2, precision: 93.5, recall: 92.1 },
    { algorithm: 'LightGBM', accuracy: 91.8, precision: 92.2, recall: 90.4 },
    { algorithm: 'CatBoost', accuracy: 88.5, precision: 87.9, recall: 89.1 }
  ];

  const correlationData = {
    patterns: ['XGBoost', 'LightGBM', 'CatBoost', 'BNN Stage', 'Rule Engine'],
    matrix: [
      [1.00, 0.85, 0.78, 0.62, 0.45],
      [0.85, 1.00, 0.81, 0.58, 0.42],
      [0.78, 0.81, 1.00, 0.55, 0.39],
      [0.62, 0.58, 0.55, 1.00, 0.92],
      [0.45, 0.42, 0.39, 0.92, 1.00]
    ]
  };

  const threatReports = [
    {
      id: 1,
      title: "Ensemble Performance Report Q1 2026",
      summary: "Deep dive into the combined efficiency of XGBoost, LightGBM, and CatBoost in the cascaded pipeline.",
      image: "https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80",
      imageAlt: "Digital data visualization",
      publishDate: "Jan 04, 2026",
      readTime: "10 min read",
      priority: "High",
      incidents: 412,
      affected: "12K",
      estimatedLoss: "18M",
      tags: ["Ensemble", "Optimization"]
    }
  ];

  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'models', label: 'ML Models', icon: 'Brain' },
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' },
    { id: 'predictions', label: 'Predictions', icon: 'Sparkles' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`main-content with-header ${sidebarCollapsed ? 'with-sidebar-collapsed' : 'with-sidebar'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumbs />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">Detection Analytics</h1>
              <p className="text-sm md:text-base text-muted-foreground">Real-time performance metrics for the Gradient Boosting Ensemble</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-primary hover:text-accent rounded-lg text-sm font-medium transition-all">
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
              {/* Sync Models Button now triggers the syncLiveScores function */}
              <button 
                onClick={syncLiveScores}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-accent hover:bg-secondary rounded-lg text-sm font-medium transition-all"
              >
                <Icon name="RefreshCw" size={16} />
                <span>Sync Models</span>
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-2 mb-8 border border-border overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab.id ? 'bg-primary text-accent shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AdvancedFilterPanel onApplyFilters={handleApplyFilters} />

          <div className="mt-8 space-y-8">
            {(activeTab === 'overview' || activeTab === 'models') && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mlModels.map((model) => (
                    <ModelPerformanceCard key={model.id} model={model} />
                  ))}
                </div>
                <AlgorithmComparison data={algorithmComparisonData} />
              </>
            )}

            {(activeTab === 'overview' || activeTab === 'patterns') && (
              <>
                <FraudPatternTimeline patterns={fraudPatterns} />
                <PatternCorrelationMatrix correlations={correlationData} />
              </>
            )}

            {(activeTab === 'overview' || activeTab === 'predictions') && <PredictiveModelingInterface />}
            {(activeTab === 'overview' || activeTab === 'reports') && <ThreatIntelligenceReport reports={threatReports} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetectionAnalytics;