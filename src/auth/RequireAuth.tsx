import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export function RequireAuth(
  { children, role

   }: { children: JSX.Element;  role?: "SUPER_ADMIN" | "CLUB_ADMIN" }) {
  const { user } = useAuth();

  if (!user) 
    return <Navigate to="/login" replace />;

  if (role && user.role !== role) 
    return <Navigate to="/login" replace />;

  return children;
}
