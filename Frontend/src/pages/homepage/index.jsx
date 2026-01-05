import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SocialProofSection from './components/SocialProofSection';
import PlatformShowcase from './components/PlatformShowcase';
import CTASection from './components/CTASection';

const Homepage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <Helmet>
        <title>FraudGuard Pro - AI-Powered Fraud Detection & Prevention Platform</title>
        <meta
          name="description"
          content="Enterprise-grade fintech security platform with AI-powered fraud detection. Real-time monitoring, risk scoring, and compliance reporting for financial institutions."
        />
        <meta
          name="keywords"
          content="fraud detection, AI security, fintech platform, risk management, compliance reporting, transaction monitoring"
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main
          className={`main-content with-header ${
            sidebarCollapsed ? 'with-sidebar-collapsed' : 'with-sidebar'
          }`}
        >
          <HeroSection />
          <FeaturesSection />
          <PlatformShowcase />
          <SocialProofSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;