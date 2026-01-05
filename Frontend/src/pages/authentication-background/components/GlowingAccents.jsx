import React from 'react';

const GlowingAccents = () => {
  return (
    <div className="glowing-accents absolute inset-0 z-6 pointer-events-none overflow-hidden">
      <div 
        className="absolute top-10 left-10 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #00E676 0%, transparent 70%)',
          boxShadow: '0 0 40px rgba(0, 230, 118, 0.4)',
          animation: 'pulse 3s ease-in-out infinite'
        }}
      ></div>

      <div 
        className="absolute top-1/4 right-20 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #1565C0 0%, transparent 70%)',
          boxShadow: '0 0 50px rgba(21, 101, 192, 0.3)',
          animation: 'pulse 4s ease-in-out infinite 0.5s'
        }}
      ></div>

      <div 
        className="absolute bottom-1/3 left-1/4 w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full opacity-18"
        style={{
          background: 'radial-gradient(circle, #00E676 0%, transparent 70%)',
          boxShadow: '0 0 45px rgba(0, 230, 118, 0.35)',
          animation: 'pulse 3.5s ease-in-out infinite 1s'
        }}
      ></div>

      <div 
        className="absolute bottom-20 right-1/3 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #1565C0 0%, transparent 70%)',
          boxShadow: '0 0 35px rgba(21, 101, 192, 0.4)',
          animation: 'pulse 4.5s ease-in-out infinite 1.5s'
        }}
      ></div>

      <div 
        className="absolute top-1/2 left-10 w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #00E676 0%, transparent 70%)',
          boxShadow: '0 0 30px rgba(0, 230, 118, 0.3)',
          animation: 'pulse 3.8s ease-in-out infinite 2s'
        }}
      ></div>

      <div 
        className="absolute top-2/3 right-10 w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full opacity-18"
        style={{
          background: 'radial-gradient(circle, #1565C0 0%, transparent 70%)',
          boxShadow: '0 0 40px rgba(21, 101, 192, 0.35)',
          animation: 'pulse 4.2s ease-in-out infinite 2.5s'
        }}
      ></div>

      <style >{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};

export default GlowingAccents;