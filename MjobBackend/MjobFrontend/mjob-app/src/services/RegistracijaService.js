import BasicService from "./BasicService";

const instance = BasicService.service();

export const signup = (data) => {
  return instance.post("/api/registracija/signup", data);
};

export default {
  signup,
};
