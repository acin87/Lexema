import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/Main/MainLayout';

import ErrorPage from '../pages/Error/ErrorPage';
import HomePageAsync from '../pages/Home/HomePageAsync';
import Authorization from '../views/Auth/Authorization';
import RequireAuth from '../views/Auth/RequireAuth';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <MainLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: '/',
                element: <HomePageAsync />,
            },
        ],
    },
    {
        path: '/auth',
        element: <Authorization />,
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
]);
