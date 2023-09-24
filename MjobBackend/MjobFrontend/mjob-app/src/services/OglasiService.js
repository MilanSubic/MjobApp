import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/api/oglas/svi");
};
export const getAllOglasiById = (id) => {
  return instance.get(`/api/oglas/users/${id}`);
};
export const getMojiOglasi = () => {
  return instance.get(`/api/oglas/mojiOglasi`);
};
export const getAllOglasiJavni = () => {
  return instance.get("/api/oglas/javni");
};
export const remove = (id) => {
  return instance.delete(`/api/oglas/${id}`);
};

export const findById = (id) => {
  return instance.get(`/api/oglas/oglas/${id}`);
};
export const getNovcaneNaknade = () => {
  return instance.get(`/api/oglas/novcanaNaknadaTip`);
};
export const getNarucioci = () => {
  return instance.get(`/api/oglas/narucioci`);
};
export default {
  getAll,
  getAllOglasiById,
  getAllOglasiJavni,
  remove,
  findById,
  getMojiOglasi,
  getNovcaneNaknade,
  getNarucioci,
};
