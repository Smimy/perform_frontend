import Cookies from "universal-cookie";

/**
 * @author Schrotzenberger Jérémy
 *
 * TokenService is used to authenticate user.
 */
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
