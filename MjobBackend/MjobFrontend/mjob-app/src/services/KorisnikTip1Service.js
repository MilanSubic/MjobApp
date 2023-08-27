import BasicService from "./BasicService";

const instance = BasicService.service();

export const getAll = () => {
  return instance.get("/api/korisnikTip1/lista");
};

export default { getAll };
