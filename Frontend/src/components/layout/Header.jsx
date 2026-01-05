import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '../ui/Button';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/command-dashboard', label: 'Command Dashboard', icon: 'LayoutDashboard' },
     { path: '/fraud-detection-form', label: 'Fraud Detection', icon: 'ShieldCheck' },
    { path: '/detection-analytics', label: 'Detection Analytics', icon: 'TrendingUp' },
    { path: '/risk-scoring-engine', label: 'Risk Scoring', icon: 'Shield' },
    { path: '/alert-management-center', label: 'Alert Center', icon: 'Bell' },
  ];

  const moreItems = [
    { path: '/compliance-reporting', label: 'Compliance', icon: 'FileText' },
  ];

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <Link to="/homepage" className="header-logo">
            <div className="header-logo-icon animate-pulse-glow">
              <Icon name="Shield" size={24} color="var(--color-accent)" />
            </div>
            <span className="header-logo-text">FraudGuard Pro</span>
          </Link>

          <nav className="header-nav">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`header-nav-link ${isActive(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            <div className="relative group">
              <button className="header-nav-link flex items-center gap-2">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 bg-card rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {moreItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${
                      isActive(item?.path) ? 'text-accent bg-primary' : ''
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="header-actions">
            <Button variant="ghost" iconName="Search" size="icon" />
            <Button variant="ghost" iconName="Bell" size="icon" />
            <Button variant="default" iconName="User" size="sm">
              Profile
            </Button>
            <button
              className="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 left-0 right-0 bg-card shadow-modal p-4"
            onClick={(e) => e?.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item?.path)
                      ? 'text-accent bg-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;