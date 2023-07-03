import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
