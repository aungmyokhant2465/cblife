import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getOnboardings = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/onboardings?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getOnboarding = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/onboardings/${id}`,
    config
  );
  return response;
};

const putOnboarding = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/onboardings/${id}`,
    data,
    config
  );
  return response;
};

const postOnboarding = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/onboardings`,
    data,
    config
  );
  return response;
};

const deleteOnboarding = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/onboardings/${id}`,
    config
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getOnboardings,
  getOnboarding,
  putOnboarding,
  postOnboarding,
  deleteOnboarding,
};
