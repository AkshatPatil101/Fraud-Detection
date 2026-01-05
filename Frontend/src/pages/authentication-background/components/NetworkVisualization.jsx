import React from 'react';

const NetworkVisualization = ({ animationSpeed = 'normal' }) => {
  const speedMultiplier = animationSpeed === 'fast' ? 0.7 : animationSpeed === 'slow' ? 1.5 : 1;

  const nodes = [
    { cx: '20%', cy: '30%', r: 4, duration: 3 * speedMultiplier },
    { cx: '80%', cy: '25%', r: 3, duration: 4 * speedMultiplier },
    { cx: '15%', cy: '70%', r: 5, duration: 2.5 * speedMultiplier },
    { cx: '85%', cy: '75%', r: 4, duration: 3.5 * speedMultiplier },
    { cx: '50%', cy: '50%', r: 6, duration: 4 * speedMultiplier, color: '#00E676' },
    { cx: '35%', cy: '15%', r: 3, duration: 3.2 * speedMultiplier },
    { cx: '65%', cy: '85%', r: 4, duration: 2.8 * speedMultiplier },
    { cx: '10%', cy: '45%', r: 3, duration: 3.7 * speedMultiplier },
    { cx: '90%', cy: '55%', r: 4, duration: 3.3 * speedMultiplier }
  ];

  const connections = [
    { x1: '20%', y1: '30%', x2: '50%', y2: '50%', duration: 3 * speedMultiplier },
    { x1: '80%', y1: '25%', x2: '50%', y2: '50%', duration: 4 * speedMultiplier },
    { x1: '15%', y1: '70%', x2: '50%', y2: '50%', duration: 2.5 * speedMultiplier },
    { x1: '85%', y1: '75%', x2: '50%', y2: '50%', duration: 3.5 * speedMultiplier },
    { x1: '35%', y1: '15%', x2: '50%', y2: '50%', duration: 3.2 * speedMultiplier },
    { x1: '65%', y1: '85%', x2: '50%', y2: '50%', duration: 2.8 * speedMultiplier },
    { x1: '10%', y1: '45%', x2: '20%', y2: '30%', duration: 3.7 * speedMultiplier },
    { x1: '90%', y1: '55%', x2: '80%', y2: '25%', duration: 3.3 * speedMultiplier }
  ];

  return (
    <div className="network-visualization absolute inset-0 z-5 opacity-20 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(21, 101, 192, 0.3)" strokeWidth="1"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        
        <g className="network-connections" stroke="#1565C0" strokeWidth="1" opacity="0.3">
          {connections?.map((conn, index) => (
            <line key={`conn-${index}`} x1={conn?.x1} y1={conn?.y1} x2={conn?.x2} y2={conn?.y2}>
              <animate 
                attributeName="opacity" 
                values="0.3;0.6;0.3" 
                dur={`${conn?.duration}s`} 
                repeatCount="indefinite" 
              />
            </line>
          ))}
        </g>

        <g className="network-nodes" filter="url(#glow)">
          {nodes?.map((node, index) => (
            <circle 
              key={`node-${index}`}
              cx={node?.cx} 
              cy={node?.cy} 
              r={node?.r} 
              fill={node?.color || '#1565C0'} 
              opacity="0.6"
            >
              <animate 
                attributeName="opacity" 
                values="0.6;1;0.6" 
                dur={`${node?.duration}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="r" 
                values={`${node?.r};${node?.r + 1};${node?.r}`} 
                dur={`${node?.duration}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default NetworkVisualization;