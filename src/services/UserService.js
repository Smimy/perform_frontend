import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * @author Schrotzenberger Jérémy
 *
 * UserService is used to know which user is logged in.
 */
const UserService = {

    setUserId(id) {
        cookies.set("userId", id, { path: "/" });
    },

    getUserId() {
        return cookies.get("userId");
    },

    setUserLogin(login) {
        cookies.set("userLogin", login)
    },

    getUserLogin() {
        return cookies.get("userLogin");
    }
}

export default UserService;