import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
}/api/beans`;

const axiosConfig = {
  withCredentials: true,
};


// Bean 전체 조회
export const getBeans = async () => {

  const response = await axios.get(
    API_BASE_URL,
    axiosConfig
  );

  return response.data;
};


// Bean 상세 조회
export const getBean = async (id) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};


// Bean 등록
export const createBean = async (data) => {

  // console.log("================bean 등록 데이터: ",data);
  const response = await axios.post(
    API_BASE_URL,
    data,
    axiosConfig
  );

  return response.data;
};


// Bean 수정
export const updateBean = async (id, data) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    data,
    axiosConfig
  );

  return response.data;
};


// Bean 삭제
export const deleteBean = async (id) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};

// Bean 검색
export const searchBeans = async (keyword) => {

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