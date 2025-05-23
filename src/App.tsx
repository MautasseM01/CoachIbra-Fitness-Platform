import React, { Suspense, lazy, useEffect, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import { fetchSampleData, fetchHomeData } from './lib/apiService';
import ReservationPage from './components/ReservationPage';
import { useAuth } from './hooks/useAuth';
import DashboardPage from './components/DashboardPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Admin components with lazy loading
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const ClientsPage = lazy(() => import("./components/admin/ClientsPage"));

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const SchedulePage = lazy(() => import("./components/admin/SchedulePage"));
  const ProgramsPage = lazy(() => import("./components/admin/ProgramsPage"));
  const MessagesPage = lazy(() => import("./components/admin/MessagesPage"));
  const MediaPage = lazy(() => import("./components/admin/MediaPage"));

  const [sampleData, setSampleData] = useState<string | null>(null);
  const [homeData, setHomeData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSampleData();
        setSampleData(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHomeData();
        setHomeData(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <p>{homeData ? homeData : 'Loading data from backend...'}</p>
        <p>{sampleData ? sampleData : 'Loading data from backend...'}</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["ROLE_ADMIN"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="media" element={<MediaPage />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
