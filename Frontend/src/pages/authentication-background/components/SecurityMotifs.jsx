import React from 'react';

const SecurityMotifs = () => {
  return (
    <div className="security-motifs absolute inset-0 z-3 opacity-5 pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-2 border-primary rounded-full">
        <div className="absolute inset-2 border border-primary rounded-full"></div>
      </div>
      
      <div className="absolute bottom-20 right-20 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-2 border-accent rounded-lg rotate-45">
        <div className="absolute inset-2 border border-accent rounded-lg"></div>
      </div>
      
      <div className="absolute top-1/3 right-10 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary w-full h-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 left-20 w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent w-full h-full">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border border-primary rounded-full opacity-30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>

      <div className="absolute top-2/3 right-1/3 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary w-full h-full">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>

      <div className="absolute bottom-1/3 left-1/3 w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 border-2 border-accent rounded-sm rotate-12">
        <div className="absolute inset-1 border border-accent rounded-sm"></div>
      </div>
    </div>
  );
};

export default SecurityMotifs;