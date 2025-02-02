import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../../pages/ErrorPage';

import HomePage from '../../pages/HomePage';
import UserProfile from '../../features/profile/UserProfile';
import Authorization from '../../features/auth/Authorization';
import FeedPage from '../../pages/FeedPage';
import FriendList from '../../features/friends/components/FriendList';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                path: '/',
                element: <FeedPage />,
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
