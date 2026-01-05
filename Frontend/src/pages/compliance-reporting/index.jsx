import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import ComplianceHeader from './components/ComplianceHeader';
import ComplianceOverview from './components/ComplianceOverview';
import ReportsSection from './components/ReportsSection';
import AuditTrailSection from './components/AuditTrailSection';
import CertificationsSection from './components/CertificationsSection';
import CalendarSection from './components/CalendarSection';

const ComplianceReporting = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ComplianceOverview />;
      case 'reports':
        return <ReportsSection />;
      case 'audit-trail':
        return <AuditTrailSection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'calendar':
        return <CalendarSection />;
      default:
        return <ComplianceOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`main-content with-header with-sidebar${sidebarCollapsed ? '-collapsed' : ''} flex-1`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumbs />
          <ComplianceHeader activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComplianceReporting;