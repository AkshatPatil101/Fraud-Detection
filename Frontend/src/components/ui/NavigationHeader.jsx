import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const [showUtilityMenu, setShowUtilityMenu] = useState(false);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
      window.location?.reload();
    }
  };

  const handleHelp = () => {
    alert('Help Guide:\n\n1. Fill in all transaction details in each section\n2. Complete location and device information\n3. Provide merchant and user data\n4. Click "Detect Fraud" to analyze the transaction\n5. Review the fraud risk score and recommendations');
  };

  return (
    <header className="navigation-header">
      <div className="navigation-header-container">
        <div className="navigation-header-logo">
          <div className="navigation-header-logo-icon">
            <Icon name="Shield" size={28} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <h1 className="navigation-header-logo-text">FraudCheck Pro</h1>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowUtilityMenu(!showUtilityMenu)}
            iconName="MoreVertical"
            iconSize={20}
            className="text-muted-foreground hover:text-foreground"
          />

          {showUtilityMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUtilityMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 overflow-hidden z-50">
                <button
                  onClick={() => {
                    handleReset();
                    setShowUtilityMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Reset Form</span>
                </button>
                <button
                  onClick={() => {
                    handleHelp();
                    setShowUtilityMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="HelpCircle" size={16} />
                  <span>Help Guide</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;