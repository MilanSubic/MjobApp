import base from "./base.service";
import axios from "axios";

const instance = base.service();
const securedInstance = base.service(true);

export const getAll = () => {
    return  axios.get("http://localhost:8080/users").then((res) => res.data);

     //return securedInstance.get("/users").then((res) => res.data);
}
export default  {
    getAll
};