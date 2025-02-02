import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../../pages/ErrorPage';

import Authorization from '../../features/auth/Authorization';
import FriendList from '../../features/friends/components/FriendList';
import FeedPage from '../../pages/FeedPage';
import HomePage from '../../pages/HomePage';
import ProfilePage from '../../pages/ProfilePage';

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
                element: <ProfilePage />,
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
