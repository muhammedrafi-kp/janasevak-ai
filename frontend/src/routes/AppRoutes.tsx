import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalLayout } from '../layouts/GlobalLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Pages
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { CitizenDashboard } from '../pages/CitizenDashboard';
import { AuthorityDashboard } from '../pages/AuthorityDashboard';
import { ReportIssue } from '../pages/ReportIssue';
import { PublicMap } from '../pages/PublicMap';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Global Layout */}
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/map" element={<PublicMap />} />
      </Route>

      {/* Citizen Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout role="citizen" />}>
        <Route index element={<CitizenDashboard />} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>

      {/* Authority Dashboard Routes */}
      <Route path="/authority" element={<DashboardLayout role="authority" />}>
        <Route index element={<AuthorityDashboard />} />
        <Route path="issues" element={<div>Issues List</div>} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold text-2xl">404 - Not Found</div>} />
    </Routes>
  );
};
