import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
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
    </Routes>
  );
}
