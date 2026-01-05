import React from 'react';

const GradientBackground = ({ variant = 'default' }) => {
  const gradientVariants = {
    default: 'from-[#0D1421] via-[#1A237E] to-[#283593]',
    login: 'from-[#0D1421] via-[#1A237E] to-[#37474F]',
    signup: 'from-[#0D1421] via-[#263238] to-[#1A237E]',
    reset: 'from-[#0D1421] via-[#37474F] to-[#263238]'
  };

  return (
    <div className="gradient-background fixed inset-0 w-screen h-screen overflow-hidden z-1">
      <div className="gradient-layer absolute inset-0 z-2">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientVariants?.[variant] || gradientVariants?.default}`}></div>
        
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0D1421] opacity-60"></div>
        
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#1A237E]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#263238]/20 to-transparent"></div>
        
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-[#1565C0]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/2 h-1/2 bg-[#00E676]/5 rounded-full blur-3xl"></div>
      </div>
      <div className="noise-overlay absolute inset-0 z-3 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      ></div>
    </div>
  );
};

export default GradientBackground;