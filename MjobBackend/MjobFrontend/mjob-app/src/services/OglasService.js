import BasicService from "./BasicService";

const instance = BasicService.service();

export const creatad = (data) => {
  return instance.post("/api/oglas", data);
};

export const getAll = () => {
  return instance.get("/api/oglas/svi");
};

export const getPostById = (id) => {
  return instance.get(`/api/oglas/oglas/${id}`);
};
export const update = (id, ad) => {
  return instance.put(`/api/oglas/${id}`, ad).then((res) => res.data);
};
export default {
  creatad,
  getAll,
  getPostById,
  update,
};
