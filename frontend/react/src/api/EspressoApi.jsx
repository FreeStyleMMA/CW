import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/recipe";

const axiosConfig = {
  withCredentials: true,
};


// Espresso 목록 조회
export const getEspressos = async (memberId) => {

  const response = await axios.get(
    `${API_BASE_URL}/getRecipes`,
    {
      params: {
        memberId,
      },
      ...axiosConfig,
    }
  );

  return response.data;
};


// Espresso detail 조회
export const getEspresso = async (id) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};
 





// Espresso 생성
export const createEspresso = async (data) => {

  const response = await axios.post(
    `${API_BASE_URL}/write`,
    data,
    axiosConfig
  );

  return response.data;
};


// Espresso 수정
export const updateEspresso = async (id, data) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    data,
    axiosConfig
  );

  return response.data;
};


// Espresso 삭제
export const deleteEspresso = async (id) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};