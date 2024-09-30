import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/Main/MainLayout';

import ContentWrapper from '../components/Skeletons/ContentWrapper/ContentWrapper';
import ErrorPage from '../pages/Error/ErrorPage';
import Authorization from '../views/Auth/Authorization';
import RequireAuth from '../views/Auth/RequireAuth';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><MainLayout /></RequireAuth>,
        children: [
            {
                path: '/',
                element: <ContentWrapper />,
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
