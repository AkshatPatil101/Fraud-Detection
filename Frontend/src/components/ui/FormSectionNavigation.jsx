import React, { useEffect, useState } from 'react';
import Icon from '../AppIcon';

const FormSectionNavigation = ({ activeSection, onSectionClick, sectionStatus }) => {
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'transaction', label: 'Transaction', icon: 'CreditCard' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'device', label: 'Device', icon: 'Smartphone' },
    { id: 'merchant', label: 'Merchant', icon: 'Store' },
    { id: 'user', label: 'User', icon: 'User' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64;
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const headerHeight = 64;
      const navHeight = 64;
      const offset = headerHeight + navHeight + 16;
      const elementPosition = element?.getBoundingClientRect()?.top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  const getSectionStatus = (sectionId) => {
    if (!sectionStatus) return '';
    return sectionStatus?.[sectionId] || '';
  };

  if (!isVisible) return null;

  return (
    <nav className="form-section-navigation">
      <div className="form-section-navigation-container">
        <ul className="form-section-navigation-list">
          {sections?.map((section) => {
            const status = getSectionStatus(section?.id);
            const isActive = activeSection === section?.id;
            const isCompleted = status === 'completed';
            const hasError = status === 'error';

            return (
              <li
                key={section?.id}
                className={`form-section-navigation-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${hasError ? 'error' : ''}`}
                onClick={() => handleSectionClick(section?.id)}
              >
                <span className="form-section-navigation-dot" />
                <Icon 
                  name={section?.icon} 
                  size={16} 
                  className="flex-shrink-0"
                />
                <span className="form-section-navigation-item-text text-sm font-medium">
                  {section?.label}
                </span>
                {isCompleted && (
                  <Icon 
                    name="CheckCircle2" 
                    size={16} 
                    className="text-success flex-shrink-0"
                  />
                )}
                {hasError && (
                  <Icon 
                    name="AlertCircle" 
                    size={16} 
                    className="text-error flex-shrink-0"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default FormSectionNavigation;