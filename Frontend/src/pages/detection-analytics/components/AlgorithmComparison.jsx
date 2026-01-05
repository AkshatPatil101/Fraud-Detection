import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AlgorithmComparison = ({ data }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Algorithm Performance Comparison</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Comparative analysis of detection algorithms across key metrics</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 md:px-4 py-2 bg-primary hover:bg-secondary rounded-lg text-xs md:text-sm font-medium text-accent transition-colors duration-300">
            Last 7 Days
          </button>
          <button className="px-3 md:px-4 py-2 bg-muted hover:bg-primary rounded-lg text-xs md:text-sm font-medium text-foreground transition-colors duration-300">
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="w-full h-64 md:h-80" aria-label="Algorithm Performance Comparison Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="algorithm" 
              stroke="var(--color-muted-foreground)"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-card)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-foreground)'
              }}
            />
            <Legend 
              wrapperStyle={{ color: 'var(--color-foreground)' }}
            />
            <Bar dataKey="accuracy" fill="var(--color-success)" name="Accuracy %" radius={[8, 8, 0, 0]} />
            <Bar dataKey="precision" fill="var(--color-info)" name="Precision %" radius={[8, 8, 0, 0]} />
            <Bar dataKey="recall" fill="var(--color-warning)" name="Recall %" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6">
        <div className="bg-muted rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <p className="text-xs md:text-sm font-medium text-foreground">Best Accuracy</p>
          </div>
          <p className="text-lg md:text-xl font-bold text-foreground">Neural Network</p>
          <p className="text-xs text-muted-foreground">97.8% detection rate</p>
        </div>
        <div className="bg-muted rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <p className="text-xs md:text-sm font-medium text-foreground">Best Precision</p>
          </div>
          <p className="text-lg md:text-xl font-bold text-foreground">Random Forest</p>
          <p className="text-xs text-muted-foreground">96.2% precision score</p>
        </div>
        <div className="bg-muted rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <p className="text-xs md:text-sm font-medium text-foreground">Best Recall</p>
          </div>
          <p className="text-lg md:text-xl font-bold text-foreground">Gradient Boosting</p>
          <p className="text-xs text-muted-foreground">95.5% recall rate</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmComparison;