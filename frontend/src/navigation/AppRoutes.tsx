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
import { MyIssuesPage } from '../pages/MyIssuesPage';
import { NotificationsPage } from '../pages/NotificationsPage';
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
        <Route path="/my-issues" element={<MyIssuesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
      </Route>

      {/* Citizen Dashboard Routes */}
      <Route element={<DashboardLayout role="citizen" />}>
        <Route path="/dashboard" element={<CitizenDashboard />} />
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
