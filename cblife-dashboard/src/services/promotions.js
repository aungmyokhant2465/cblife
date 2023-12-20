import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getPromotions = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/promotions?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getPromotion = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/promotions/${id}`,
    config
  );
  return response;
};

const putPromotion = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/promotions/${id}`,
    data,
    config
  );
  return response;
};

const postPromotion = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/promotions`,
    data,
    config
  );
  return response;
};

const deletePromotion = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/promotions/${id}`,
    config
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPromotions,
  getPromotion,
  putPromotion,
  postPromotion,
  deletePromotion,
};
