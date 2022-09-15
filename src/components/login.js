import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPw, setInputPw] = useState('');

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('LOGIN...');
        console.log(`email: ${inputEmail}, password: ${inputPw}`);
        axios.post('http://localhost:9000/api/v1/auth/login', {email: inputEmail, password: inputPw})
            .then(res => {

                console.log(res.data);
                console.log(res.data.error);
                console.log(res.data.meta);
                

                if (res.data.error && !res.data.meta.isSuccess) {
                    alert(res.data.error);
                } else {
                    const resData = res.data.data;
                    const userRole = {
                        seq: resData.role.seq,
                        name: resData.role.role_name,
                        name_display: resData.role.role_name_display
                    };
                    sessionStorage.setItem('email', resData.email);
                    sessionStorage.setItem('name', resData.name);
                    sessionStorage.setItem('role', userRole);
                    sessionStorage.setItem('status', resData.status);
                    sessionStorage.setItem('services', resData.services);
                    sessionStorage.setItem('created_at', resData.created_at);
                    sessionStorage.setItem('lat_modified_at', resData.last_modified_at);

                    localStorage.setItem('auth_token', resData.tokens.accessToken);
                    localStorage.setItem('refresh_token', resData.tokens.refreshToken);

                    // 작업 완료 되면 페이지 이동(새로고침)
                    document.location.href = '/'
                }
            })
            .catch(err => alert(`err: ${err}`));
    };

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        console.log('EFFECT...');

        axios.get(
            'http://localhost:9000/api/v1/users/me', {
                headers: {
                    auth_token: localStorage.getItem('auth_token')
                }
            }
        )
        .then(res => {
            // 로그인 패이지 접속시, session 의 email 정보와 /me 의 이메일 정보가 같으면 대시보드로 이동
            const sessionUserEmail = sessionStorage.getItem('email') || '';

            console.log('2');
            console.log(`res.data.data.email: ${res.data.data.email}`);
            console.log(`sessionUserEmail: ${sessionUserEmail}`);
            console.log('3');

            if (sessionUserEmail.toUpperCase() === res.data.data.email.toUpperCase()) {
                console.log('4');
                // 초기 화면으로 이동
                document.location.href = '/';
            }
            console.log('5');
        })
        .catch(err => {
            alert(`err: ${JSON.stringify(err)}`);
        });
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []);

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_email'>ID : </label>
                <input type='text' name='input_email' value={inputEmail} onChange={handleInputEmail} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;