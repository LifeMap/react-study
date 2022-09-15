import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import NotFound from './components/404';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/' element={<Header />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
