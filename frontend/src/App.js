import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderLeft } from './components/Header/Header-left.jsx';
import { HeaderTop } from './components/Header/Header-top.jsx';
import { useHeaderAndNavDimensions } from './components/Header/layout.jsx';
import { fetchUserInfo } from './redux/slices/auth';
import { CircularProgress } from '@mui/material';

import { Footer } from './components/Footer/index.jsx';
import { LandingMain } from './components/LandingMain/index.jsx';
import { FullPost } from './pages/FullPost.jsx';
import { Posts } from './pages/Posts/index.jsx';
import { Login } from './pages/Login/index.jsx';
import { UserInfo } from './pages/UserInfo/index.jsx';
import { AddPost } from './pages/AddPost/index.jsx';
// import { Home, FullPost, Registration, AddPost, Login } from "./pages";

function App() {
    const { contentStyle, headerRef, navRef } = useHeaderAndNavDimensions();
    const [activeCity, setActiveCity] = useState('Казань');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.data);
    const isReady = useSelector((state) => state.auth.status) !== 'loading';

    React.useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    // if (!isReady) {
    //     return (
    //         <center>
    //             <CircularProgress />
    //         </center>
    //     );
    // }

    return (
        <>
            <HeaderTop
                headerRef={headerRef}
                activeCity={activeCity}
                setActiveCity={setActiveCity}
            />
            <HeaderLeft style={contentStyle.marginTop} navRef={navRef} />
            <main style={contentStyle}>
                <Routes>
                    <Route
                        element={
                            <LandingMain activeCity={activeCity} setActiveCity={setActiveCity} />
                        }
                        path="/"
                    />
                    <Route
                        element={<FullPost activeCity={activeCity} setActiveCity={setActiveCity} />}
                        path="/posts/:id"
                    />
                    <Route element={<Posts activeCity={activeCity} />} path="/posts/" />
                    <Route element={<Login />} path="auth/" />
                    <Route
                        element={
                            <UserInfo
                                {...user}
                                setActiveCity={setActiveCity}
                                activeCity={activeCity}
                            />
                        }
                        path="auth/me"
                    />
                    <Route element={<AddPost />} path="/posts/:id/edit" />
                    <Route element={<AddPost />} path="/posts/create" />
                </Routes>
                <Footer style={contentStyle} />
            </main>
        </>
    );
}

export default App;
