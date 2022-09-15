import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Header() {

    console.log(`Header...${localStorage.getItem('auth_token')}`);

    const [menu, setMenu] = useState();

    useEffect(() => {
        if (sessionStorage.getItem('menu')) {
            setMenu(sessionStorage.getItem('menu'));
        } else {
            axios.get('http://localhost:9000/api/v1/menu', 
                {
                    headers: {
                        auth_token: localStorage.getItem('auth_token')
                    }
                }
            )
            .then(res => {
                setMenu(res.data);
            })
            .catch(err => {
                alert(`${JSON.stringify(err)}`);
            });
        }
    }, []);

    const menuHome = menu && menu.data[0];
    console.log(`menuHome: ${JSON.stringify(menuHome)}`);
    // console.log(`menuHome.link_url: ${menuHome.link_url}`);
    
    const subMenus = menuHome && menuHome.sub_menus;
    console.log(`subMenus: ${JSON.stringify(subMenus)}`);


    const subs = menuHome && menuHome.map((item, index) => {
        return (
            // <li className="{item.class_names}"><a href="{item.link_url}">{item.name}</a></li>
            <li className="{item.class_names}">{item.name}</li>
        );
    });

    return (
        <header className="header">
            <div className="gnb">
                <div>
                    <ul>
                        <li className="{menuHome.class_names}">{menuHome.name}</li>
                        {subs}
                    </ul>
                </div>
            </div>
        </header>
        // <></>
    );
}

export default Header;