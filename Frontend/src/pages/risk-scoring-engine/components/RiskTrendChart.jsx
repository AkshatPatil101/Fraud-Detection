import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RiskTrendChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2">{payload?.[0]?.payload?.date}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="text-xs text-foreground">{entry?.name}:</span>
              <span className="text-sm font-bold" style={{ color: entry?.color }}>
                {entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">{title}</h3>
      <div className="w-full h-64 md:h-80" aria-label={title}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: '12px' }}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: '12px' }}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="avgScore" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              name="Average Score"
              dot={{ fill: 'var(--color-accent)', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="highRisk" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              name="High Risk"
              dot={{ fill: 'var(--color-error)', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="lowRisk" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              name="Low Risk"
              dot={{ fill: 'var(--color-success)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskTrendChart;