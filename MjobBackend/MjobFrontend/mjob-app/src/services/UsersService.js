import BasicService from "./BasicService";

const instance = BasicService.service();

export const getAll = () => {
  return instance.get("/api/korisnici1/lista");
};
export const update = (user) => {
  return instance
    .put(`/api/korisnici1/${user.id}`, user)
    .then((res) => res.data);
};
export const remove = (id) => {
  return instance.delete(`/api/korisnici1/${id}`);
};
export const insert = (user) => {
  return instance.post("/api/korisnici1".user).then((res) => res.data);
};
export default { getAll, update, remove, insert };
