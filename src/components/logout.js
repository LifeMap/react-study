import React, { useState, useEffect } from "react";
import { removeAuthToken, removeRefreshToken } from '../storages/Cookie';
import { Navigate } from 'react-router-dom';


function Logout() {

    sessionStorage.clear();
    localStorage.clear();
    removeAuthToken();
    removeRefreshToken();

    return <Navigate to="/login">로그인 페이지로 이동</Navigate>;
}

export default Logout;