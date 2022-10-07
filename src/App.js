import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './components/login';
import Logout from './components/logout';
import Header from './components/header';
import NotFound from './components/404';

function App() {
    return (
        <CookiesProvider>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/logout' element={<Logout />}></Route>
                        <Route path='/' element={<Header />}></Route>
                        <Route path='*' element={<NotFound />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </CookiesProvider>
    );
}

export default App;
