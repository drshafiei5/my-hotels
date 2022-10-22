import React, { Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes, privateRoutes } from '../routes';
import { getIsLoggedIn } from '../../store/users';
import Page404 from '../../components/pages/404Page';
import Page403 from '../../components/pages/403Page';

const AppRouter: React.FC = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route element={isLoggedIn ? <Outlet /> : <Navigate to={'/auth/login'} />}>
                        {
                            privateRoutes.map(route =>
                                route.path ? (
                                    <Route path={route.path} element={<route.component />} key={route.path} />
                                ) : null
                            )
                        }
                    </Route>

                    {
                        publicRoutes.map(route =>
                            route.path ? (
                                <Route path={route.path} element={<route.component />} key={route.path} />
                            ) : null
                        )
                    }

                    <Route path='/403' element={<Page403 />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRouter;