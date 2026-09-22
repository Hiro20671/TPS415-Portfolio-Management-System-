import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Admin Pages
import DashboardOverview from './pages/admin/DashboardOverview';
import PersonalInfoManagement from './pages/admin/PersonalInfoManagement';
import EducationManagement from './pages/admin/EducationManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';
import SkillsManagement from './pages/admin/SkillsManagement';
import ServicesManagement from './pages/admin/ServicesManagement';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import CertificationsManagement from './pages/admin/CertificationsManagement';
import AchievementsManagement from './pages/admin/AchievementsManagement';
import ContactInfoManagement from './pages/admin/ContactInfoManagement';
import ContactMessagesManagement from './pages/admin/ContactMessagesManagement';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-muted)',
        }}
      >
        Authenticating session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Portfolio Route */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <DashboardOverview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/personal-info"
                element={
                  <ProtectedRoute>
                    <PersonalInfoManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/education"
                element={
                  <ProtectedRoute>
                    <EducationManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/experience"
                element={
                  <ProtectedRoute>
                    <ExperienceManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/skills"
                element={
                  <ProtectedRoute>
                    <SkillsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <ServicesManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <ProjectsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/certifications"
                element={
                  <ProtectedRoute>
                    <CertificationsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/achievements"
                element={
                  <ProtectedRoute>
                    <AchievementsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contact-info"
                element={
                  <ProtectedRoute>
                    <ContactInfoManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute>
                    <ContactMessagesManagement />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
