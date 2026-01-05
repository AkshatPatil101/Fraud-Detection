import React from 'react';

const AuthenticationFormContainer = ({ children, authState = 'login' }) => {
  return (
    <div className="form-container-wrapper fixed inset-0 z-10 flex items-center justify-center px-6 py-12">
      <div 
        className="form-container bg-card rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 ease-out"
        style={{
          padding: '36px',
          border: '1px solid rgba(21, 101, 192, 0.3)',
          boxShadow: '0 0 20px rgba(21, 101, 192, 0.15), 0 8px 16px rgba(21, 101, 192, 0.2)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthenticationFormContainer;