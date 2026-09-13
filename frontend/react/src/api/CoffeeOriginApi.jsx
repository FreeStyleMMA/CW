import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
}/api/coffee-orogins`;

const axiosConfig = {
  withCredentials: true,
};


// CoffeeOrigin 전체 조회
export const getCoffeeOrigins = async () => {

  const response = await axios.get(
    API_BASE_URL,
    axiosConfig
  );

  return response.data;
};


// CoffeeOrigin 상세 조회
export const getCoffeeOrigin = async (id) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};


// 국가별 CoffeeOrigin 조회
export const getCoffeeOriginsByCountry = async (countryId) => {

  const response = await axios.get(
    `${API_BASE_URL}/country/${countryId}`,
    axiosConfig
  );

  return response.data;
};


// CoffeeOrigin 옵션 조회
export const getCoffeeOriginOptions = async (countryId) => {

  const response = await axios.get(
    `${API_BASE_URL}/options`,
    {
      ...axiosConfig,
      params: {
        countryId,
      },
    }
  );

  return response.data;
};


// CoffeeOrigin 등록
export const createCoffeeOrigin = async (data) => {

  const response = await axios.post(
    API_BASE_URL,
    data,
    axiosConfig
  );

  return response.data;
};


// CoffeeOrigin 수정
export const updateCoffeeOrigin = async (id, data) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    data,
    axiosConfig
  );

  return response.data;
};


// CoffeeOrigin 삭제
export const deleteCoffeeOrigin = async (id) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};