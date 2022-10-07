import { Cookies } from "react-cookie";
const cookieUtil = new Cookies();

// refresh_token
function setRefreshToken (refreshToken) {
    console.log(`setRefreshToken token: ${refreshToken}`);
    return cookieUtil.set('refresh_token', refreshToken, {
        httpOnly: true,
        // secure: true,
        path: '/',
    });
};
function getRefreshToken () {
    console.log(`getRefreshToken`);
    return cookieUtil.get('refresh_token');
};
function removeRefreshToken () {
    console.log('removeRefreshToken');
    return cookieUtil.remove('refresh_token', { httpOnly: true, secure: true, path: '/' });
};

// auth_token
function setAuthToken (token) {
    console.log(`setAuthToken token: ${token}`);
    return cookieUtil.set('auth_token', token, {
        httpOnly: true,
        // secure: true,
        path: '/',
    });
};
function getAuthToken () {
    console.log(`getAuthToken`);
    return cookieUtil.get('auth_token');
}
function removeAuthToken () {
    console.log('removeAuthToken');
    return cookieUtil.remove('auth_token', { httpOnly: true, secure: true, path: '/' });
};

// etc cookies
function setCookie (name, value, option) {
    return cookieUtil.set(name, value, {...option});
}
function getCookie (name) {
    return cookieUtil.get(name);
}
function removeCookie (name) {
    return cookieUtil.remove(name);
}

const CookieUtil = {
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    setAuthToken,
    getAuthToken,
    removeAuthToken,
    setCookie,
    getCookie,
    removeCookie
};

export default CookieUtil;
