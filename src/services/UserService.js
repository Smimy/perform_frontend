import Cookies from 'universal-cookie';

const cookies = new Cookies();

const UserService = {

    /*async authenticate(login, password) {
        const isExist = login === "admin" && password === "admin"
        return new Promise(function(resolve, reject) {
            if (isExist) {
                cookies.set('authToken', 'bwikjfdbni<jfbnpj<nglikjfnbmwogjfn ', { path: '/' });
                setTimeout(function() {
                    resolve(isExist);
                }, 300);
            } else {
                setTimeout(function() {
                    reject(isExist);
                }, 500);
            }
        });
    },*/

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