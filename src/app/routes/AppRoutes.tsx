import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../../pages/ErrorPage';
import Authorization from '../../features/auth/Authorization';
import FeedPage from '../../pages/FeedPage';
import FriendsPage from '../../pages/FriendsPage';
import HomePage from '../../pages/HomePage';
import ProfilePage from '../../pages/ProfilePage';
import { AppRoute, SiteAppRoutePath } from './Config';
import MessengerPageAsync from '../../pages/messenger/MessengerPageAsync';

export const AppRoutes = createBrowserRouter([
    {
        path: SiteAppRoutePath[AppRoute.HOME],
        element: <HomePage />,
        children: [
            {
                path: SiteAppRoutePath[AppRoute.HOME],
                element: <FeedPage />,
            },
            {
                path: SiteAppRoutePath[AppRoute.FRIENDS],
                element: <FriendsPage />,
            },
            {
                path: SiteAppRoutePath[AppRoute.USER],
                element: <ProfilePage />,
            },
            {
                path: SiteAppRoutePath[AppRoute.MESSENGER],
                element: <MessengerPageAsync />,
            },
        ],
    },
    {
        path: SiteAppRoutePath[AppRoute.AUTH],
        element: <Authorization />,
    },
    {
        path: SiteAppRoutePath[AppRoute.NOT_FOUND],
        element: <ErrorPage />,
    },
]);
