import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getNews = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/news?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getOneNews = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${BACKEND_URL}/api/news/${id}`, config);
  return response;
};

const putNews = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/news/${id}`,
    data,
    config
  );
  return response;
};

const postNews = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${BACKEND_URL}/api/news`, data, config);
  return response;
};

const deleteNews = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${BACKEND_URL}/api/news/${id}`, config);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNews,
  getOneNews,
  putNews,
  postNews,
  deleteNews,
};
