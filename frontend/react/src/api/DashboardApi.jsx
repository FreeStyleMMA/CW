import api from "./axios";

export const getOverview = async () => {
  const response = await api.get("/api/dashboard/overview");
  return response.data;
};

export const getRecentRecords = async () => {
  const response = await api.get("/api/dashboard/recent-records");
  return response.data;
};