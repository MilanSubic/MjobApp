import BasicService from "./BasicService";

const instance = BasicService.service();

export const getById = (id) => {
  return instance.get(`/api/posaoTip/${id}`);
};
export const getTipoviPosla = () => {
  return instance.get(`/api/posaoTip/tipoviPoslova`);
};

export default { getById, getTipoviPosla };
