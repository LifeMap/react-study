import React, { useState, useEffect } from "react";
// import { getAuthToken, getRefreshToken } from '../storages/Cookie';
import { useSetRecoilState } from "recoil";
import { Link } from 'react-router-dom';
import axios from "axios";

function Header() {

    // const cookieAuthToken = getAuthToken();
    // console.log(`Cookie auth_token: ${cookieAuthToken}`);

    const sessionUser = localStorage.getItem('user');
    console.log(`Session user: ${sessionUser}`);

    // const [authToken, setAuthToken] = useState(getAuthToken);
    // const [refreshToken, setRefreshToken] = useState(getRefreshToken);
    const [user, setUser] = useState(null);

    const [menu, setMenu] = useState();
    const [menuHome, setMenuHome] = useState();
    const [subMenus, setSubMenus] = useState();

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        console.log('EFFECT...');
        setUser(JSON.parse(sessionUser));

        async function fetchData() {
            if (sessionStorage.getItem('menu')) {
                setMenu(JSON.parse(sessionStorage.getItem('menu')));
            } else {
                const result = await axios.get('http://localhost:9000/api/v1/menu',
                    {
                        // headers: {
                        //     auth_token: authToken
                        // }
                    }
                );
                setMenu(result.data);
                //---

                // sessionStorage.setItem('menu', result.data);
                // console.log(`menu result : ${JSON.parse(sessionStorage.getItem('menu'))}`);
            }
        }
        fetchData();

        setMenuHome(menu ? menu.data[0] : '');
        console.log(`menuHome: ${JSON.stringify(menuHome)}`);

        const subMenus = menuHome && menuHome.sub_menus;
        console.log(`subMenus: ${JSON.stringify(subMenus)}`);

        const subs = subMenus && subMenus.map((item, index) => {
            return (
                // <li className="{item.class_names}"><a href="{item.link_url}">{item.name}</a></li>
                <li className="{item.class_names}">{item.name}</li>
            );
        });
        setSubMenus(subs);
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [
    ]);




    return (
        <header className="header">
            <div className="gnb">
                <div>
                    <ul>
                        <li className={menuHome ? menuHome.class_names : ''}>{menuHome ? menuHome.name : 'aaa'}</li>
                        {subMenus ? subMenus : 'bbb'}
                        <li><a href='/logout'>Logout</a></li>
                    </ul>
                </div>
                <div>{typeof user + ''}</div>
                <div>

                    {JSON.stringify(user)}
                    <p>{!!user && user.name}님!</p>
                </div>
            </div>
        </header>
    );
}

export default Header;