import React, { useState, useEffect } from 'react';
import "@/styles/auth.css";
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import GradientBackground from './components/GradientBackground';
import NetworkVisualization from './components/NetworkVisualization';
import WorldMapArcs from './components/WorldMapArcs';
import SecurityMotifs from './components/SecurityMotifs';
import CenterBlurZone from './components/CenterBlurZone';
import GlowingAccents from './components/GlowingAccents';
import Icon from '../../components/AppIcon';

const AuthenticationBackground = () => {
  const navigate = useNavigate();
    useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/homepage");
    }
  }, [navigate]);

  const [isSignUp, setIsSignUp] = useState(false);
  const [authState, setAuthState] = useState('unauthenticated');
  const [isLoading, setIsLoading] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false,
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    login: {
      email: 'rahulredddy@gmail.com',
      password: 'Secure123'
    },
    signup: {
      fullName: 'rahul reddy',
      email: 'rahulreddy@gmail.com',
      password: 'NewSecure456!',
      confirmPassword: 'NewSecure456!'
    }
  };

  useEffect(() => {
    const handleFocus = () => setFormFocused(true);
    const handleBlur = () => setFormFocused(false);

    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs?.forEach(input => {
      input?.addEventListener('focus', handleFocus);
      input?.addEventListener('blur', handleBlur);
    });

    return () => {
      formInputs?.forEach(input => {
        input?.removeEventListener('focus', handleFocus);
        input?.removeEventListener('blur', handleBlur);
      });
    };
  }, [isSignUp]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignUp) {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const expectedCreds = isSignUp ? mockCredentials?.signup : mockCredentials?.login;
    
    if (isSignUp) {
      if (formData?.email !== expectedCreds?.email || 
          formData?.password !== expectedCreds?.password ||
          formData?.fullName !== expectedCreds?.fullName) {
        setErrors({
          email: `Please use mock credentials: ${expectedCreds?.email}`,
          password: `Password: ${expectedCreds?.password}`,
          fullName: `Full Name: ${expectedCreds?.fullName}`
        });
        return;
      }
    } else {
      if (formData?.email !== expectedCreds?.email || formData?.password !== expectedCreds?.password) {
        setErrors({
          email: `Invalid credentials. Use: ${expectedCreds?.email}`,
          password: `Password: ${expectedCreds?.password}`
        });
        return;
      }
    }

    setAuthState(isSignUp ? 'signing-up' : 'logging-in');
    setIsLoading(true);
    
   setTimeout(() => {
  setIsLoading(false);
  setAuthState('authenticated');


  localStorage.setItem("isAuthenticated", "true");

  
  localStorage.setItem("userEmail", formData.email);

  
  navigate("/homepage");
}, 2000);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      agreeToTerms: false,
      rememberMe: false
    });
    setErrors({});
    setAuthState('unauthenticated');
  };

  return (
    <div className="auth-page authentication-page relative w-screen h-screen overflow-hidden bg-background border-0 outline-none ring-0">
      <GradientBackground variant={isSignUp ? 'signup' : 'login'} />
      <NetworkVisualization animationSpeed="normal" />
      <WorldMapArcs />
      <SecurityMotifs />
      <CenterBlurZone formFocused={formFocused} authState={authState} />
      <GlowingAccents />
      <header className="brand-header fixed top-0 left-0 z-15 p-4 md:p-6 lg:p-8">
        <div className="brand-logo-container flex items-center gap-2 md:gap-3">
          <div 
            className="logo-icon w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-250"
            style={{
              boxShadow: '0 0 15px rgba(21, 101, 192, 0.3)'
            }}
          >
            <Icon name="Shield" size={24} color="#1565C0" strokeWidth={2.5} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
          </div>
          <div className="brand-text">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground tracking-tight">
              FraudGuard Pro
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-caption mt-0.5">
              Enterprise Security Platform
            </p>
          </div>
        </div>
      </header>
     <div className="form-container-wrapper fixed inset-0 z-10 flex items-center justify-center px-4 md:px-6 py-8 md:py-12 border-0 outline-none ring-0">

        <div 
          className="form-container bg-card rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 ease-out p-6 md:p-8 lg:p-9"
          style={{
            border: '1px solid rgba(21, 101, 192, 0.3)',
            boxShadow: '0 0 20px rgba(21, 101, 192, 0.15), 0 8px 16px rgba(21, 101, 192, 0.2)'
          }}
        >
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-card-foreground mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {isSignUp 
                ? 'Join FraudGuard Pro to secure your enterprise' :'Sign in to access your security dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {isSignUp && (
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={handleInputChange}
                error={errors?.fullName}
                required
              />
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
            />

            {isSignUp && (
              <>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  required
                />

                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  name="agreeToTerms"
                  checked={formData?.agreeToTerms}
                  onChange={handleInputChange}
                  error={errors?.agreeToTerms}
                  required
                />
              </>
            )}

            {!isSignUp && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Checkbox
                  label="Remember me"
                  name="rememberMe"
                  checked={formData?.rememberMe}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-smooth"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              fullWidth
              iconName={isSignUp ? 'UserPlus' : 'LogIn'}
              iconPosition="left"
              loading={isLoading}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-sm md:text-base text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
            <p className="text-xs md:text-sm text-center text-muted-foreground">
              
            </p>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay fixed inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 border-4 border-accent/30 rounded-full animate-pulse"></div>
            </div>
            <p className="text-foreground text-sm md:text-base font-medium">
              {isSignUp ? 'Creating your account...' : 'Authenticating...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationBackground;