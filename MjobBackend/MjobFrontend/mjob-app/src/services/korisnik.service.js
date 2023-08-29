import BasicService from "./BasicService";
import service from "./base.service";

const authInstance = service.service(true);
const instance = BasicService.service();
export const getAll = () => {
  return instance.get("/users").then((res) => res.data);
};
export const getUserJobs = (id) => {
  return instance.get(`/users/${id}/jobs`).then((res) => res.data);
};
export const getUserByUsername = (username) => {
  return instance.get(`/users/${username}`).then((res) => res.data);
};
export const getUser = () => {
  return authInstance.get(`/users/user`).then((res) => res.data);
};
export const acceptRegistration = (id, brojClanskeKarte) => {
  return instance.put(`/users/${id}/acceptRegistration/${brojClanskeKarte}`);
};
export const refuseRegistration = (id) => {
  return instance.put(`/users/${id}/refuseRegistration`);
};
export const removeUser = (id) => {
  return instance.put(`/users/${id}/deleteAccount`);
};
export const reactivateUser = (id) => {
  return instance.put(`/users/${id}/reactivateUser`);
};
export default {
  getAll,
  getUserJobs,
  acceptRegistration,
  refuseRegistration,
  removeUser,
  reactivateUser,
  getUserByUsername,
  getUser,
};
