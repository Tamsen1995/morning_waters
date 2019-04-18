import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://secure-river-14395.herokuapp.com`
    // baseURL: `http://localhost:3306`
  });
};
