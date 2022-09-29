import { Cookies } from "react-cookie";
const cookies = new Cookies();

// refresh_token
export const setRefreshToken = (refreshToken) => {
    return cookies.set('refresh_token', refreshToken, {
        sameSite: 'strict',
        path: "/auth",
    });
};
export const getRefreshToken = () => {
    return cookies.get('refresh_token');
};
export const removeRefreshToken = () => {
    console.log('removeRefreshToken');
    return cookies.remove('refresh_token', { sameSite: 'strict', path: "/auth" });
};

// auth_token
export const setAuthToken = (token) => {
    console.log(`token: ${token}`);
    return cookies.set('auth_token', token, {
        sameSite: 'strict',
        path: '/auth',
        secure: true
    });
};
export const getAuthToken = () => {
    return cookies.get('auth_token');
}
export const removeAuthToken = () => {
    console.log('removeAuthToken');
    return cookies.remove('auth_token', { sameSite: 'strict', path: '/auth', secure: true });
};

// etc cookies
export const setCookie = (name, value, option) => {
    return cookies.set(name, value, {...option});
}
export const getCookie = (name) => {
    return cookies.get(name);
}
export const removeCookie = (name) => {
    return cookies.remove(name);
}