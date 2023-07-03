import service from "./base.service";

const instance = service.service(true);

export const getKonverzacije = (data) => {
  return instance.post("/api/konverzacija/all", data);
};

export const getPoruke = (data) => {
  return instance.post("/api/poruke/all", data);
};

export const getSadrzajDokumenta = (data) => {
  return instance.get(`/api/dokumentSadrzaj/dokument/${data}`);
};

export const postPoruka = (data) => {
  return instance.post(`api/poruke`, data);
};

export const postKonverzacija = (data) => {
  return instance.post(`api/konverzacija`, data);
};
