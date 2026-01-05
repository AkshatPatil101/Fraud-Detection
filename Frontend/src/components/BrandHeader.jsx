import React from 'react';
import Icon from './AppIcon';

const BrandHeader = () => {
  return (
    <header className="brand-header fixed top-0 left-0 z-15 p-8">
      <div className="brand-logo-container flex items-center gap-3">
        <div 
          className="logo-icon w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-250"
          style={{
            boxShadow: '0 0 15px rgba(21, 101, 192, 0.3)'
          }}
        >
          <Icon name="Shield" size={28} color="#1565C0" strokeWidth={2.5} />
        </div>
        <div className="brand-text">
          <h1 className="text-2xl font-heading font-bold text-foreground tracking-tight">
            FraudGuard Pro
          </h1>
          <p className="text-xs text-muted-foreground font-caption mt-0.5">
            Enterprise Security Platform
          </p>
        </div>
      </div>
    </header>
  );
};

export default BrandHeader;