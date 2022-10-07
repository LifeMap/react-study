import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import CookieUtil from '../utils/cookieUtil';


function Logout() {
    sessionStorage.clear();
    localStorage.clear();
    CookieUtil.removeAuthToken();
    CookieUtil.removeRefreshToken();

    return <Navigate to="/login">로그인 페이지로 이동</Navigate>;
}

export default Logout;