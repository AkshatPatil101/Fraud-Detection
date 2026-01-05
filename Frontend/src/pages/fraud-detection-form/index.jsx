import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import '@/styles/fraud-form.css';
import NavigationHeader from '@/components/ui/NavigationHeader';
import FormSectionNavigation from '@/components/ui/FormSectionNavigation';
import ResultsDisplayCard from '@/components/ui/ResultsDisplayCard';
import TransactionSection from './components/TransactionSection';
import LocationSection from './components/LocationSection';
import DeviceSection from './components/DeviceSection';
import MerchantSection from './components/MerchantSection';
import UserSection from './components/UserSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const FraudDetectionForm = () => {
  const [activeSection, setActiveSection] = useState('transaction');
  const [sectionStatus, setSectionStatus] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [backendData, setBackendData] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    transaction_id: '',
    user_id: '',
    timestamp: new Date().toISOString().slice(0, 16),
    amount: '',
    currency: 'USD',
    transaction_type: 'purchase',
    channel: 'web',
    billing_country: '',
    billing_city: '',
    shipping_country: '',
    shipping_city: '',
    latitude: '',
    longitude: '',
    ip_address: 'Fetching...', 
    device_location_lat: '',
    device_location_lon: '',
    device_id: '',
    device_type: 'web',
    device_os: '',
    browser: '',
    user_agent: navigator.userAgent,
    merchant_id: '',
    merchant_name: '',
    merchant_category: '',
    merchant_country: '',
    payment_method: '',
    user_signup_date: '',
    user_country: '',
    user_segment: 'retail',
    kyc_status: 'verified',
    user_risk_flag: false,
    user_total_txn_count: '0',
    user_total_txn_amount: '0',
    user_past_fraud_count: '0',
    days_since_last_txn: '0',
    failed_login_attempts_last_24h: '0'
  });

  // --- AUTOMATIC IP FETCHING ---
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setFormData(prev => ({ ...prev, ip_address: data.ip }));
      })
      .catch(err => {
        console.error("IP Fetch failed:", err);
        setFormData(prev => ({ ...prev, ip_address: "127.0.0.1" }));
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace('section-', '');
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-128px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('[id^="section-"]');
    sections?.forEach((section) => observer?.observe(section));

    return () => observer?.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e?.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateAllSections = () => {
    const sections = {
      transaction: ['transaction_id', 'user_id', 'timestamp', 'amount', 'currency', 'transaction_type', 'channel'],
      location: ['billing_country', 'billing_city', 'shipping_country', 'shipping_city'],
      device: ['ip_address', 'device_id', 'device_type', 'device_os', 'browser'],
      merchant: ['merchant_id', 'merchant_name', 'merchant_category', 'merchant_country', 'payment_method'],
      user: ['user_signup_date', 'user_country', 'user_segment', 'kyc_status']
    };

    let allErrors = {};
    const newSectionStatus = {};

    Object.entries(sections)?.forEach(([section, fields]) => {
      const sectionErrors = {};
      fields.forEach(field => {
        if (!formData?.[field] && formData?.[field] !== false && formData?.[field] !== 0) {
           sectionErrors[field] = 'Required';
        }
      });

      if (Object.keys(sectionErrors)?.length > 0) {
        allErrors = { ...allErrors, ...sectionErrors };
        newSectionStatus[section] = 'error';
      } else {
        newSectionStatus[section] = 'completed';
      }
    });

    setSectionStatus(newSectionStatus);
    setErrors(allErrors);
    return Object.keys(allErrors)?.length === 0;
  };

  const calculateFraudScore = (data) => {
    // Keep your existing frontend logic for UI display
    let score = 0;
    const reasons = [];
    const recommendations = [];

    if (parseFloat(data?.amount) > 5000) {
      score += 25;
      reasons.push('High transaction amount');
      recommendations.push('Verify identity');
    }

    return {
      fraudScore: Math.min(score, 100),
      isFraud: score >= 40,
      reasoning: reasons.length > 0 ? reasons.join('. ') : 'Transaction appears legitimate.',
      recommendations: recommendations.length > 0 ? recommendations : ['Standard monitoring']
    };
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateAllSections()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Prepare the Nested JSON for the backend
    const finalPayload = {
      "name": "🚨 TRANSACTION_ASSESSMENT",
      "description": "Real-time fraud analysis for current transaction",
      "transaction": {
        ...formData,
        // Ensure numeric types are sent correctly
        amount: parseFloat(formData.amount) || 0,
        user_total_txn_count: parseInt(formData.user_total_txn_count) || 0,
        user_total_txn_amount: parseFloat(formData.user_total_txn_amount) || 0,
        user_past_fraud_count: parseInt(formData.user_past_fraud_count) || 0,
        days_since_last_txn: parseFloat(formData.days_since_last_txn) || 0,
        failed_login_attempts_last_24h: parseInt(formData.failed_login_attempts_last_24h) || 0,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        device_location_lat: parseFloat(formData.device_location_lat) || 0,
        device_location_lon: parseFloat(formData.device_location_lon) || 0,
        user_risk_flag: formData.user_risk_flag ? 1 : 0
      }
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const bData = await response.json();
      console.log("Backend response received:", bData);
      setBackendData(bData);

      if (bData.model_scores) {
        localStorage.setItem('latest_model_scores', JSON.stringify(bData.model_scores));
      }

      // Show toast based on risk score
      const riskScore = bData.final_score * 100;
      console.log(bData.final_score)
      if (riskScore <= 25) {
        toast.success('Transaction Approved - Low Risk', {
          duration: 4000,
          position: 'top-right',
        });
      } else if (riskScore > 25 && riskScore <= 36) {
        toast('Transaction Flagged for Manual Review', {
          icon: '⚠️',
          duration: 4000,
          position: 'top-right',
        });
      } else if (riskScore > 36 && riskScore < 85) {
        toast.error('High Risk Transaction Detected', {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        toast.error('Transaction Blocked - Critical Risk Level', {
          duration: 5000,
          position: 'top-right',
        });
      }

      // Trigger the results display
      const fraudResults = calculateFraudScore(formData);
      setResults(fraudResults);

      setTimeout(() => {
        document.getElementById('results-card')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error connecting to backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseResults = () => setResults(null);

  return (
    <div className="fraud-form min-h-screen bg-background">
      <Toaster />
      <NavigationHeader />
      <FormSectionNavigation 
        activeSection={activeSection}
        onSectionClick={setActiveSection}
        sectionStatus={sectionStatus}
      />
      <main className="max-w-[1200px] mx-auto px-4 py-8" style={{ paddingTop: '144px' }}>
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Transaction Fraud Detection</h1>
          <p className="text-muted-foreground max-w-3xl">Analyze transaction patterns and device metadata in real-time.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <TransactionSection formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <LocationSection formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <DeviceSection formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <MerchantSection formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <UserSection formData={formData} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} errors={errors} />

          <div className="flex justify-center pt-8">
            <Button type="submit" variant="default" size="lg" loading={isSubmitting} disabled={isSubmitting} iconName="Shield" className="min-w-[280px]">
              {isSubmitting ? 'Analyzing...' : 'Check for Fraud'}
            </Button>
          </div>
        </form>

        {results && <ResultsDisplayCard results={results} backendData={backendData} onClose={handleCloseResults} />}
      </main>
    </div>
  );
};

export default FraudDetectionForm;