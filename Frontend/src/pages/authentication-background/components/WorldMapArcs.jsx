import React from 'react';

const WorldMapArcs = () => {
  const arcs = [
    { x1: '10%', y1: '40%', x2: '30%', y2: '20%', delay: '0s' },
    { x1: '30%', y1: '20%', x2: '50%', y2: '30%', delay: '0.5s' },
    { x1: '50%', y1: '30%', x2: '70%', y2: '25%', delay: '1s' },
    { x1: '70%', y1: '25%', x2: '90%', y2: '35%', delay: '1.5s' },
    { x1: '15%', y1: '60%', x2: '35%', y2: '70%', delay: '0.3s' },
    { x1: '35%', y1: '70%', x2: '55%', y2: '65%', delay: '0.8s' },
    { x1: '55%', y1: '65%', x2: '75%', y2: '75%', delay: '1.3s' },
    { x1: '75%', y1: '75%', x2: '85%', y2: '60%', delay: '1.8s' }
  ];

  return (
    <div className="world-map-arcs absolute inset-0 z-4 opacity-10 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1565C0" stopOpacity="0" />
            <stop offset="50%" stopColor="#1565C0" stopOpacity="1" />
            <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <g className="data-flow-arcs">
          {arcs?.map((arc, index) => {
            const midX = (parseFloat(arc?.x1) + parseFloat(arc?.x2)) / 2;
            const midY = Math.min(parseFloat(arc?.y1), parseFloat(arc?.y2)) - 10;
            const path = `M ${arc?.x1} ${arc?.y1} Q ${midX}% ${midY}% ${arc?.x2} ${arc?.y2}`;
            
            return (
              <g key={`arc-${index}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="url(#arc-gradient)"
                  strokeWidth="2"
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur="4s"
                    begin={arc?.delay}
                    repeatCount="indefinite"
                  />
                </path>
                <circle r="3" fill="#00E676" opacity="0">
                  <animateMotion
                    dur="4s"
                    begin={arc?.delay}
                    repeatCount="indefinite"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="4s"
                    begin={arc?.delay}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>

        <g className="geographic-markers" opacity="0.6">
          <circle cx="20%" cy="35%" r="2" fill="#1565C0">
            <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="45%" cy="28%" r="2" fill="#1565C0">
            <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="75%" cy="30%" r="2" fill="#1565C0">
            <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="25%" cy="65%" r="2" fill="#00E676">
            <animate attributeName="r" values="2;4;2" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="60%" cy="68%" r="2" fill="#00E676">
            <animate attributeName="r" values="2;4;2" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default WorldMapArcs;