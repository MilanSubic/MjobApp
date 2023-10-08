import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  try {
    const token = sessionStorage.getItem("token");
    const jwtDecoded = jwtDecode(token);
    return jwtDecoded;
  } catch (error) {
    return null;
  }
}
