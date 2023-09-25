import BasicService from "./BasicService";

const instance = BasicService.service();

export const getById = (id) => {
  return instance.get(`/api/posaoTip/${id}`);
};
export const getByNaziv = (naziv) => {
  return instance.get(`/api/posaoTip/posao/${naziv}`);
};
export const getTipoviPosla = () => {
  return instance.get(`/api/posaoTip/tipoviPoslova`);
};

export default { getById, getByNaziv, getTipoviPosla };
