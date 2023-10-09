import BasicService from "./BasicService";
import service from "./base.service";
const authInstance = service.service(true);
const instance = BasicService.service();

export const creatad = (data) => {
  return instance.post("/api/oglas", data);
};

export const getAll = (data) => {
  return authInstance.post(`/api/oglas/svi`, data);
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
export const view = (id) => {
  return instance.put(`/api/oglas/${id}/view`);
};
export const viewAuth = (id) => {
  return authInstance.put(`/api/oglas/${id}/view`);
};

export default {
  creatad,
  getAll,
  getPostById,
  update,
  view,
  viewAuth,
  numOsoba,
  numPrOsoba,
};
