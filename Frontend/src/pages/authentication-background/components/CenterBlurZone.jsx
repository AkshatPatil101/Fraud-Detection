import React from 'react';

const CenterBlurZone = ({ formFocused = false, authState = 'unauthenticated' }) => {
  const blurIntensity = formFocused ? 'backdrop-blur-md' : 'backdrop-blur-sm';
  const zoneSize = authState === 'signup' ? 'h-[700px] md:h-[750px] lg:h-[800px]' : 'h-[500px] md:h-[550px] lg:h-[600px]';

  return (
    <div 
      className={`blur-zone absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[85%] lg:w-[90%] max-w-[600px] ${zoneSize} transition-all duration-800 ease-in-out ${blurIntensity}`}
      style={{
        background: 'radial-gradient(circle, rgba(26, 35, 126, 0.4) 0%, rgba(26, 35, 126, 0.2) 50%, transparent 70%)'
      }}
    >
      {/* <div className="absolute inset-0 rounded-3xl border border-primary/10"></div> */}
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      
      {authState === 'logging-in' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-4 border-accent/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterBlurZone;