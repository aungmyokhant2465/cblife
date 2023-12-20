import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getPrivates = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/privates?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getPrivate = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${BACKEND_URL}/api/privates/${id}`, config);
  return response;
};

const putPrivate = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/privates/${id}`,
    data,
    config
  );
  return response;
};

const postPrivate = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/privates`,
    data,
    config
  );
  return response;
};

const deletePrivate = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/privates/${id}`,
    config
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPrivates,
  getPrivate,
  putPrivate,
  postPrivate,
  deletePrivate,
};
