import BasicService from "./BasicService";

const instance = BasicService.service();

export const creatad = (data) => {
  return instance.post("/api/oglas", data);
};

export default {
  creatad,
};
