import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL || ""
}/api/recipe`;


const axiosConfig = {
  withCredentials: true,
};


// Recipe 목록 조회
export const getRecipes = async (memberId) => {

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


// Recipe 상세 조회
export const getRecipe = async (id) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};


// Recipe 등록
export const createRecipe = async (data) => {

  const response = await axios.post(
    `${API_BASE_URL}/write`,
    data,
    axiosConfig
  );

  return response.data;
};


// Recipe 수정
export const updateRecipe = async (id, data) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    data,
    axiosConfig
  );

  return response.data;
};


// Recipe 삭제
export const deleteRecipe = async (id) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    axiosConfig
  );

  return response.data;
};