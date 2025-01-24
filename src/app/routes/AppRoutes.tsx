import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../layouts/Main/MainLayout';

import ErrorPage from '../../pages/Error/ErrorPage';
import FriendList from '../../pages/Friends/FriendList';
import HomePage from '../../pages/Home/HomePage';
import UserProfile from '../../pages/User/UserProfile';
import Authorization from '../../views/Auth/Authorization';
import RequireAuth from '../../views/Auth/RequireAuth';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: (
            
                <MainLayout />
            
        ),
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/friends',
                element: <FriendList />,
            },
            {
                path: '/friends/user/:id',
                element: <UserProfile />,
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
