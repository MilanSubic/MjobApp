import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/oglasi");
};
export const getAllOglasiById = (id) => {
  return instance.get(`/oglasi/users/${id}`);
};
export const getAllOglasiJavni = () => {
  return instance.get("/oglasi/javni");
};
export const remove = (id) => {
  return instance.delete(`/oglasi/${id}`);
};
export default {
  getAll,
  getAllOglasiById,
  getAllOglasiJavni,
  remove,
};
