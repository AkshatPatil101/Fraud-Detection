import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    { path: '/homepage', label: 'Home', icon: 'Home' },
    { path: '/command-dashboard', label: 'Command Dashboard', icon: 'LayoutDashboard' },
    { path: '/fraud-detection-form', label: 'Fraud Detection', icon: 'ShieldCheck' },
    { path: '/detection-analytics', label: 'Detection Analytics', icon: 'TrendingUp' },
    { path: '/risk-scoring-engine', label: 'Risk Scoring Engine', icon: 'Shield' },
    { path: '/alert-management-center', label: 'Alert Management', icon: 'Bell' },
    { path: '/compliance-reporting', label: 'Compliance Reporting', icon: 'FileText' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Icon name={mobileOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
      </button>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''} ${
          !mobileOpen ? 'mobile-hidden' : ''
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon animate-pulse-glow">
              <Icon name="Shield" size={28} color="var(--color-accent)" />
            </div>
            <span className="sidebar-logo-text">FraudGuard Pro</span>
          </div>
          <button
            className="sidebar-toggle hidden lg:block"
            onClick={onToggleCollapse}
          >
            <Icon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
              color="var(--color-foreground)"
            />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`sidebar-nav-link ${isActive(item?.path) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <Icon name={item?.icon} size={20} />
              <span className="sidebar-nav-link-text">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;