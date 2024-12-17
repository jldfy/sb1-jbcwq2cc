import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/layout/Layout';
import { LoginPage } from '../components/LoginPage';
import { HomePage } from '../components/HomePage';
import { DashboardPage } from '../components/DashboardPage';
import { CalendarPage } from '../components/calendar/CalendarPage';
import { TeamPage } from '../components/TeamPage';
import { ProfilePage } from '../components/ProfilePage';
import { PatientPage } from '../components/patients/PatientPage';
import { PrescriptionsPage } from '../components/prescription/PrescriptionsPage';

export function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}