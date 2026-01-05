import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location?.pathname?.split('/')?.filter((x) => x);

  const breadcrumbNameMap = {
    homepage: 'Home',
    'command-dashboard': 'Command Dashboard',
    'detection-analytics': 'Detection Analytics',
    'risk-scoring-engine': 'Risk Scoring Engine',
    'alert-management-center': 'Alert Management Center',
    'compliance-reporting': 'Compliance Reporting',
    'fraud-detection-form': 'Fraud Detection',

  };

  if (pathnames?.length === 0 || location?.pathname === '/homepage') {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/homepage"
        className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors duration-300"
      >
        <Icon name="Home" size={16} />
        <span>Home</span>
      </Link>
      {pathnames?.map((value, index) => {
        const to = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
        const isLast = index === pathnames?.length - 1;
        const label = breadcrumbNameMap?.[value] || value;

        return (
          <React.Fragment key={to}>
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link
                to={to}
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;