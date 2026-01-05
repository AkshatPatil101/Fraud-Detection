import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PredictiveModelingInterface = () => {
  const [selectedModel, setSelectedModel] = useState('neural-network');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);

  const modelOptions = [
    { value: 'neural-network', label: 'Neural Network (Deep Learning)' },
    { value: 'random-forest', label: 'Random Forest Ensemble' },
    { value: 'gradient-boosting', label: 'Gradient Boosting Machine' },
    { value: 'logistic-regression', label: 'Logistic Regression' }
  ];

  const transactionTypeOptions = [
    { value: 'purchase', label: 'Purchase Transaction' },
    { value: 'transfer', label: 'Fund Transfer' },
    { value: 'withdrawal', label: 'ATM Withdrawal' },
    { value: 'payment', label: 'Bill Payment' }
  ];

  const handlePredict = () => {
    const riskScore = Math.floor(Math.random() * 100);
    const fraudProbability = (riskScore / 100)?.toFixed(2);
    
    setPredictionResult({
      riskScore,
      fraudProbability,
      recommendation: riskScore > 70 ? 'Block Transaction' : riskScore > 40 ? 'Manual Review' : 'Approve',
      confidence: Math.floor(Math.random() * 20) + 80,
      factors: [
        { name: 'Transaction Amount', impact: 'High', value: '+35' },
        { name: 'User Behavior Pattern', impact: 'Medium', value: '+18' },
        { name: 'Location Anomaly', impact: 'Low', value: '+8' },
        { name: 'Time of Transaction', impact: 'Medium', value: '+12' }
      ]
    });
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Brain" size={24} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Predictive Modeling Interface</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Test fraud detection models with custom parameters</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Select
            label="Detection Model"
            options={modelOptions}
            value={selectedModel}
            onChange={setSelectedModel}
            description="Choose the ML algorithm for prediction"
          />

          <Input
            label="Transaction Amount ($)"
            type="number"
            placeholder="Enter amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e?.target?.value)}
            description="Transaction value in USD"
          />

          <Select
            label="Transaction Type"
            options={transactionTypeOptions}
            value={transactionType}
            onChange={setTransactionType}
            placeholder="Select transaction type"
          />

          <Input
            label="User Account Age (days)"
            type="number"
            placeholder="Enter account age"
            description="Number of days since account creation"
          />

          <Input
            label="Previous Transactions"
            type="number"
            placeholder="Enter count"
            description="Total historical transactions"
          />

          <Button 
            variant="default" 
            fullWidth 
            iconName="Play"
            onClick={handlePredict}
            disabled={!transactionAmount || !transactionType}
          >
            Run Prediction
          </Button>
        </div>

        <div className="space-y-4">
          {predictionResult ? (
            <>
              <div className="bg-muted rounded-lg p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Prediction Results</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Score</span>
                    <span className={`text-2xl md:text-3xl font-bold ${
                      predictionResult?.riskScore > 70 ? 'text-error' : 
                      predictionResult?.riskScore > 40 ? 'text-warning' : 'text-success'
                    }`}>
                      {predictionResult?.riskScore}
                    </span>
                  </div>

                  <div className="w-full bg-card rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        predictionResult?.riskScore > 70 ? 'bg-error' : 
                        predictionResult?.riskScore > 40 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${predictionResult?.riskScore}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Fraud Probability</p>
                      <p className="text-lg md:text-xl font-bold text-foreground">{predictionResult?.fraudProbability}</p>
                    </div>
                    <div className="bg-card rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                      <p className="text-lg md:text-xl font-bold text-foreground">{predictionResult?.confidence}%</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${
                    predictionResult?.recommendation === 'Block Transaction' ? 'bg-error' :
                    predictionResult?.recommendation === 'Manual Review' ? 'bg-warning' : 'bg-success'
                  }`}>
                    <p className="text-sm font-semibold text-center">
                      Recommendation: {predictionResult?.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="text-sm md:text-base font-semibold text-foreground mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  {predictionResult?.factors?.map((factor, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">{factor?.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          factor?.impact === 'High' ? 'bg-error text-error-foreground' :
                          factor?.impact === 'Medium' ? 'bg-warning text-warning-foreground' :
                          'bg-info text-info-foreground'
                        }`}>
                          {factor?.impact}
                        </span>
                        <span className="font-semibold text-foreground">{factor?.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-muted rounded-lg p-8">
              <div className="text-center">
                <Icon name="BarChart3" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Enter transaction details and run prediction to see results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictiveModelingInterface;