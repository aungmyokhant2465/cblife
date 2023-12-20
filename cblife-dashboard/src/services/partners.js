import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getPartners = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/partners?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getPartner = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${BACKEND_URL}/api/partners/${id}`, config);
  return response;
};

const putPartner = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/partners/${id}`,
    data,
    config
  );
  return response;
};

const postPartner = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/partners`,
    data,
    config
  );
  return response;
};

const deletePartner = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/partners/${id}`,
    config
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPartners,
  getPartner,
  putPartner,
  postPartner,
  deletePartner,
};
