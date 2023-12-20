import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const login = async (credentials) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/auths/login`,
    credentials
  );
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
};
