import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
    return instance.get("/oglasi");
};
export const getMyAds = () => {
    return instance.get("/oglasi");
};
export const getAllOglasiById = (id) => {
    return instance.get("korisnici/${id}/oglasi");
};
export default {
    getAll,
    getMyAds,
    getAllOglasiById
};