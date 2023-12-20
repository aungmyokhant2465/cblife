import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getKnowledges = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/knowledges?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getKnowledge = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/knowledges/${id}`,
    config
  );
  return response;
};

const putKnowledge = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/Knowledges/${id}`,
    data,
    config
  );
  return response;
};

const postKnowledge = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/Knowledges`,
    data,
    config
  );
  return response;
};

const deleteKnowledge = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/Knowledges/${id}`,
    config
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getKnowledges,
  getKnowledge,
  putKnowledge,
  postKnowledge,
  deleteKnowledge,
};
