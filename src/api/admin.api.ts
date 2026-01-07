import { api } from "./axios";

export async function fetchAdminDashboard() {
    console.log("fetchAdminDashboard called");
  const res = await api.get("/admin/dashboard");
  console.log("data",res.data);
  return res.data;
}
