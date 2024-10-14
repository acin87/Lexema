import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../layouts/Main/MainLayout';

import ErrorPage from '../../pages/Error/ErrorPage';
import Authorization from '../../Views/Auth/Authorization';
import RequireAuth from '../../Views/Auth/RequireAuth';
import PostList from '../../Views/Posts/postList';

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
                element: <PostList />,
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
