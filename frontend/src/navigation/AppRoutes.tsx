import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalLayout } from '../layouts/GlobalLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { CitizenDashboard } from '../pages/CitizenDashboard';
import { AuthorityDashboard } from '../pages/AuthorityDashboard';
import { ReportIssue } from '../pages/ReportIssue';
import { PublicMap } from '../pages/PublicMap';
import { ComplaintDetails } from '../pages/ComplaintDetails';
import { ProfilePage } from '../pages/ProfilePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes with Global Layout */}
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<PublicMap />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
      </Route>

      {/* Citizen Dashboard Routes */}
      <Route element={<DashboardLayout role="citizen" />}>
        <Route path="/dashboard" element={<CitizenDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* We can add /dashboard/reports etc here later */}
      </Route>

      {/* Authority Dashboard Routes */}
      <Route element={<DashboardLayout role="authority" />}>
        <Route path="/authority" element={<AuthorityDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};