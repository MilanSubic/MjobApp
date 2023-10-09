import BasicService from "./BasicService";
import service from "./base.service";
const authInstance = service.service(true);
const instance = BasicService.service();

export const creatad = (data) => {
  return instance.post("/api/oglas", data);
};

export const getAll = () => {
  return authInstance.get("/api/oglas/svi");
};

export const getPostById = (id) => {
  return instance.get(`/api/oglas/oglas/${id}`);
};
export const update = (id, ad) => {
  return instance.put(`/api/oglas/${id}`, ad).then((res) => res.data);
};

export const numOsoba = (id) => {
  return instance.get(`api/oglas/numUsers/${id}`);
};
export const numPrOsoba = (id) => {
  return instance.get(`api/oglas/numAcceptUsers/${id}`);
};
export default {
  creatad,
  getAll,
  getPostById,
  update,
  numOsoba,
  numPrOsoba,
};
