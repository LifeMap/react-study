import cookie from "react-cookies";

// refresh_token
export function setRefreshToken (refreshToken) {
    console.log(`setRefreshToken token: ${refreshToken}`);
    return cookie.set('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
    });
};
// export function getRefreshToken () {
//     console.log(`getRefreshToken`);
//     return cookie.get('refresh_token');
// };
export function removeRefreshToken () {
    console.log('removeRefreshToken');
    return cookie.remove('refresh_token', { httpOnly: true, secure: true, path: '/' });
};

// auth_token
export function setAuthToken (token) {
    console.log(`setAuthToken token: ${token}`);
    return cookie.save('auth_token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
    });
};
// export function getAuthToken () {
//     console.log(`getAuthToken`);
//     return cookie.get('auth_token');
// }
export function removeAuthToken () {
    console.log('removeAuthToken');
    return cookie.remove('auth_token', { httpOnly: true, secure: true, path: '/' });
};

// etc cookies
export function setCookie (name, value, option) {
    return cookie.save(name, value, {...option});
}
export function getCookie (name) {
    return cookie.get(name);
}
export function removeCookie (name) {
    return cookie.remove(name);
}