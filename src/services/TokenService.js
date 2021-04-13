import Cookies from "universal-cookie";

const cookies = new Cookies();
const TokenService = {
  connect(token) {
    cookies.set("authToken", token, { path: "/" });
  },

  getToken() {
    return cookies.get("authToken");
  },

  disconnect() {
    cookies.remove("authToken");
    cookies.remove("userId");
  },
};

export default TokenService;
