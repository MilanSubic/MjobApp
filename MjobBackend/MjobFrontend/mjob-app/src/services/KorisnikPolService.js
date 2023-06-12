import BasicService from "./BasicService";

const instance = BasicService.service();

export const getAll = () => {
  return instance.get("/api/korisnikPol1/lista");
};

export default { getAll };
