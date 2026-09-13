import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
}/api/roasteries`;

const axiosConfig = {
  withCredentials: true,
};

// Roastery 전체 조회
export const getRoasteries = async () => {

  const response = await axios.get(
    API_BASE_URL,
    axiosConfig
  );

  return response.data;
};


// Roastery 상세 조회
export const getRoastery = async (id) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};


// Roastery 등록
export const createRoastery = async (data) => {

  const response = await axios.post(
    API_BASE_URL,
    data,
    axiosConfig
  );

  return response.data;
};


// Roastery 수정
export const updateRoastery = async (id, data) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    data,
    axiosConfig
  );

  return response.data;
};


// Roastery 삭제
export const deleteRoastery = async (id) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};

// Roastery 검색
export const searchRoasteries = async (keyword) => {

  const response = await axios.get(
    API_BASE_URL,
    {
      ...axiosConfig,
      params: {
        keyword,
      },
    }
  );

  return response.data;
};