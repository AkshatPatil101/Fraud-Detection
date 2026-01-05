import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route,Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthenticationBackground from "./pages/authentication-background";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import RiskScoringEngine from './pages/risk-scoring-engine';
import ComplianceReporting from './pages/compliance-reporting';
import DetectionAnalytics from './pages/detection-analytics';
import CommandDashboard from './pages/command-dashboard';
import AlertManagementCenter from './pages/alert-management-center';
import Homepage from './pages/homepage';
import FraudDetectionForm from "./pages/fraud-detection-form";


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        {/* <Route path="/" element={<CommandDashboard />} /> */}
        <Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<AuthenticationBackground />} />
<Route path="/signup" element={<AuthenticationBackground />} />

        <Route path="/risk-scoring-engine" element={<RiskScoringEngine />} />
        <Route path="/compliance-reporting" element={<ComplianceReporting />} />
        <Route path="/detection-analytics" element={<DetectionAnalytics />} />
        {/* <Route path="/command-dashboard" element={<CommandDashboard />} /> */}
        <Route
  path="/command-dashboard"
  element={
    <ProtectedRoute>
      <CommandDashboard />
    </ProtectedRoute>
  }
/>

        <Route path="/alert-management-center" element={<AlertManagementCenter />} />
        <Route path="/homepage" element={<Homepage />} />
         <Route path="/fraud-detection-form" element={<FraudDetectionForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
