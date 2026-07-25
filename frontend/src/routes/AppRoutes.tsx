import { Routes, Route } from 'react-router-dom';
import { GlobalLayout } from '../layouts/GlobalLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

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
      {/* Global Layout routes */}
      <Route element={<GlobalLayout />}>
        {/* Unprotected global routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/map" element={<PublicMap />} />

        {/* Public-only routes (redirect if logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
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
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold text-2xl">404 - Not Found</div>} />
    </Routes>
  );
};
