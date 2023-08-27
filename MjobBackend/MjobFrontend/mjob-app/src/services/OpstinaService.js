import BasicService from "./BasicService";

const instance = BasicService.service();

export const getAll = () => {
  return instance.get("/api/opstina/lista");
};

export default { getAll };
