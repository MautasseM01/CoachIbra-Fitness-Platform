import React, { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

// Admin components with lazy loading
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const ClientsPage = lazy(() => import("./components/admin/ClientsPage"));

function App() {
  const SchedulePage = lazy(() => import("./components/admin/SchedulePage"));
  const ProgramsPage = lazy(() => import("./components/admin/ProgramsPage"));
  const MessagesPage = lazy(() => import("./components/admin/MessagesPage"));
  const MediaPage = lazy(() => import("./components/admin/MediaPage"));

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
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
