import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getAuths = async (token) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${BACKEND_URL}/api/auths`, config);
  return response;
};

const getAuth = async (token) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${BACKEND_URL}/api/auths/me`, config);
  return response;
};

const putAuth = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${BACKEND_URL}/api/auths`, data, config);
  return response;
};

const postAuth = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${BACKEND_URL}/api/auths`, data, config);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAuth,
  putAuth,
  getAuths,
  postAuth,
};
