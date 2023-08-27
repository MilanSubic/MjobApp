import service from "./base.service";

const instance = service.service(true);

export const signup = (data) => {
  return instance.post("/api/registracija/signup", data);
};

export default {
  signup,
};
