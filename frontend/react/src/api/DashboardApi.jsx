import api from "./axios";

export const getOverview = async () => {
  const response = await api.get("/api/dashboard/overview");
  console.log("overview 데이터 조회: ",response.data);
  return response.data;
};

export const getRecentRecords = async () => {
  const response = await api.get("/api/dashboard/recent-records");
  console.log("최근 기록 데이터 조회: ",response.data);
  return response.data;
};