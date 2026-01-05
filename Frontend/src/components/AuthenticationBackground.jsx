import React from 'react';

const AuthenticationBackground = ({ authState = 'unauthenticated', isLoading = false, formFocused = false }) => {
  return (
    <div className="authentication-background fixed inset-0 w-screen h-screen overflow-hidden z-1">
      <div className="gradient-layer absolute inset-0 z-2">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1421] via-[#1A237E] to-[#283593]"></div>
      </div>

      <div className="network-visualization absolute inset-0 z-5 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(21, 101, 192, 0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <g className="network-nodes">
            <circle cx="20%" cy="30%" r="4" fill="#1565C0" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="80%" cy="25%" r="3" fill="#1565C0" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="15%" cy="70%" r="5" fill="#1565C0" opacity="0.7">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="85%" cy="75%" r="4" fill="#1565C0" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.95;0.6" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="50%" r="6" fill="#00E676" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          <g className="network-connections" stroke="#1565C0" strokeWidth="1" opacity="0.3">
            <line x1="20%" y1="30%" x2="50%" y2="50%">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="80%" y1="25%" x2="50%" y2="50%">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="15%" y1="70%" x2="50%" y2="50%">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="85%" y1="75%" x2="50%" y2="50%">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>

      <div 
        className={`blur-zone absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] h-[600px] transition-all duration-800 ease-in-out ${
          formFocused ? 'backdrop-blur-md' : 'backdrop-blur-sm'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(26, 35, 126, 0.4) 0%, transparent 70%)'
        }}
      >
        {authState === 'logging-in' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="security-motifs absolute inset-0 z-3 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent rounded-lg rotate-45"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay absolute inset-0 z-10 flex items-center justify-center bg-background/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-foreground text-sm font-medium">Authenticating...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationBackground;