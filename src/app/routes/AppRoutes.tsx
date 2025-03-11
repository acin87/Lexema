import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from '../../entities/auth/component/RequireAuth';
import AuthPage from '../../pages/auth/AuthPage';
import ErrorPage from '../../pages/ErrorPage';
import FeedPage from '../../pages/FeedPage';
import FriendsPage from '../../pages/FriendsPage';
import HomePage from '../../pages/MainPage';
import MessengerPageAsync from '../../pages/messenger/MessengerPageAsync';
import ProfilePage from '../../pages/ProfilePage';
import { AppRoute, SiteAppRoutePath } from './Config';

export const AppRoutes = createBrowserRouter([
    {
        path: SiteAppRoutePath[AppRoute.AUTH],
        element: <AuthPage />,
    },
    {
        path: SiteAppRoutePath[AppRoute.HOME],
        element: (
            <RequireAuth>
                <HomePage />
            </RequireAuth>
        ),
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
        path: SiteAppRoutePath[AppRoute.NOT_FOUND],
        element: <ErrorPage />,
    },
]);
