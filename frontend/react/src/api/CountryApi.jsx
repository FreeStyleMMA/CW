import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || ""
}/api/countries`;

const axiosConfig = {
  withCredentials: true,
};


// Country 전체 조회
export const getCountries = async () => {

  const response = await axios.get(
    API_BASE_URL,
    axiosConfig
  );

  return response.data;
};


// Country 상세 조회
export const getCountry = async (id) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};


// Country 검색
export const searchCountries = async (keyword) => {

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


// Country 등록
export const createCountry = async (data) => {

  const response = await axios.post(
    API_BASE_URL,
    data,
    axiosConfig
  );

  return response.data;
};


// Country 수정
export const updateCountry = async (id, data) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    data,
    axiosConfig
  );

  return response.data;
};


// Country 삭제
export const deleteCountry = async (id) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};