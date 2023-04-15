import axios from "axios";

const basicUrl = "http://localhost:8080/home";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  service: () => {
    const instance = axios.create(basicUrl);
    instance.defaults.headers.common["Content-Type"] = "application/json";
    return instance;
  },
};
