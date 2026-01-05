import React, { useState, useEffect } from 'react';
import AuthenticationBackground from './AuthenticationBackground';
import BrandHeader from './BrandHeader';
import AuthenticationFormContainer from './AuthenticationFormContainer';

const AuthenticationStateManager = ({ children }) => {
  const [authState, setAuthState] = useState('unauthenticated');
  const [isLoading, setIsLoading] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

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
  }, []);

  const handleAuthStateChange = (newState) => {
    setAuthState(newState);
    if (newState === 'logging-in' || newState === 'signing-up') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setAuthState('authenticated');
      }, 2000);
    }
  };

  return (
    <>
      <AuthenticationBackground 
        authState={authState}
        isLoading={isLoading}
        formFocused={formFocused}
      />
      <BrandHeader />
      <AuthenticationFormContainer authState={authState}>
        {React.cloneElement(children, { 
          onAuthStateChange: handleAuthStateChange,
          authState 
        })}
      </AuthenticationFormContainer>
    </>
  );
};

export default AuthenticationStateManager;