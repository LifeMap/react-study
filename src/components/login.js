import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CookieUtil from '../utils/cookieUtil';
import AxiosUtil from "../utils/axiosUtil";

function Login() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [authErrMsg, setAuthErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickLogin = async () => {
        console.log('LOGIN...');
        console.log(`email: ${inputEmail}, password: ${inputPw}`);

        setLoading(true);

        // input validation
        if (inputEmail === '' || inputPw === '') {
            setAuthErrMsg('Email 혹은 비밀번호의 입력값이 올바르지 않습니다.');
            setLoading(false);
            return;
        }

        // call login api
        const res = await AxiosUtil.fetch('post', '/api/v1/auth/login', null, null, {email: inputEmail, password: inputPw});
        console.log(`axiosUtil res: ${JSON.stringify(res)}`);
        // console.log(`accessToken: ${res.data.tokens?.accessToken}`);
        console.log(`refreshToken: ${res.data.tokens.refreshToken}`);
        // CookieUtil.setAuthToken(res.data.tokens?.accessToken);
        CookieUtil.setRefreshToken(res.data.tokens.refreshToken);

        // console.log(`res cookie: ${res.cookies.get('auth_token')}`);
        // console.log(`auth_token in cookie: ${CookieUtil.getAuthToken()}`);
        console.log(`refresh_token in cookie: ${CookieUtil.getRefreshToken()}`);
        window.location.href = '/';
    };

    // 로그인된 유저 정보 구하기
    const getMe = async() => {
        const res = await AxiosUtil.fetch('get', '/api/v1/users/me', {auth_token: CookieUtil.getAuthToken()}, null, null);
        return res;
    }
    // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect( () => {
        console.log('EFFECT...');

        const res = getMe();
        // axios.get(
        //     'http://localhost:9000/api/v1/users/me', {
        //         headers: {
        //             auth_token: localStorage.getItem('auth_token')
        //         }
        //     }
        // )
        // .then(res => {
        //     // 로그인 패이지 접속시, session 의 email 정보와 /me 의 이메일 정보가 같으면 대시보드로 이동
        //     const sessionUserEmail = sessionStorage.getItem('email') || '';
        //
        //     console.log('2');
        //     console.log(`res.data.data.email: ${res.data.data.email}`);
        //     console.log(`sessionUserEmail: ${sessionUserEmail}`);
        //     console.log('3');
        //
        //     if (sessionUserEmail.toUpperCase() === res.data.data.email.toUpperCase()) {
        //         console.log('4');
        //         // 초기 화면으로 이동
        //         document.location.href = '/';
        //     }
        //     console.log('5');
        // })
        // .catch(err => {
        //     console.log(`get /api/v1/users/me err: ${JSON.stringify(err)}`);
        // });
        console.log(`me res: ${res}`);
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []);

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_email'>ID : </label>
                <input type='email' name='input_email' value={inputEmail} onChange={handleInputEmail} autoFocus={true} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
            <div>
                <label>{authErrMsg}</label>
            </div>
        </div>
    );
}

export default Login;