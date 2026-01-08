import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminClubs from "../pages/AdminClubs";
import { RequireAuth } from "../auth/RequireAuth";
import AppLayout from "../components/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route
  path="/admin/dashboard"
  element={
    <RequireAuth>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </RequireAuth>
  }
/>
<Route
  path="/admin/clubs"
  element={
    <RequireAuth role="SUPER_ADMIN">
      <AppLayout>
        <AdminClubs />
      </AppLayout>
    </RequireAuth>
  }
/>
    </Routes>
  );
}
