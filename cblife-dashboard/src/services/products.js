import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getProducts = async (token, limit, offset) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${BACKEND_URL}/api/products?limit=${limit}&offset=${offset}`,
    config
  );
  return response;
};

const getProduct = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${BACKEND_URL}/api/products/${id}`, config);
  return response;
};

const putProduct = async (token, id, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BACKEND_URL}/api/products/${id}`,
    data,
    config
  );
  return response;
};

const postProduct = async (token, data) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/products`,
    data,
    config
  );
  return response;
};

const deleteProduct = async (token, id) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/products/${id}`,
    config
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProducts,
  getProduct,
  putProduct,
  postProduct,
  deleteProduct,
};
