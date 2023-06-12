import BasicService from "./BasicService";

const instance = BasicService.service();

export const getAll = () => {
  return instance.get("/api/naseljenoMjesto/lista");
};

export default { getAll };
