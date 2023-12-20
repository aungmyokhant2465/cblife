import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getImageUrl = async (token) => {
  const config = { headers: { authorization: `Bearer ${token}` } };
  const response = axios.get(`${BACKEND_URL}/api/upload/image`, config);
  return response;
};

const uploadImage = async (uri, data) => {
  const config = {
    headers: {
      "Content-Type": "image/*",
      "x-amz-acl": "public-read",
    },
  };
  const response = await axios.put(uri, data, config);
  return response;
};

const deleteImage = async (token, data) => {
  const response = await axios.delete(`${BACKEND_URL}/api/upload/image`, {
    headers: { authorization: `Bearer ${token}` },
    data,
  });
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  uploadImage,
  deleteImage,
  getImageUrl,
};
