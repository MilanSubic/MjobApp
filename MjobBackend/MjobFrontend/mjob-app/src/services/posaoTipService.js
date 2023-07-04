import BasicService from "./BasicService";

const instance = BasicService.service();

export const getById = (id) => {
  return instance.get(`/api/posaoTip/${id}`);
};

export default { getById };
