import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from '../../features/auth/ui/RequireAuth';
import ChatFeature from '../../features/messenger/ui/ChatFeature';
import ChatMessageList from '../../features/messenger/ui/ChatMessageList';
import AuthPage from '../../pages/auth/AuthPage';
import FeedPage from '../../pages/FeedPage/FeedPage';
import FriendsPage from '../../pages/FriendsPage';
import HomePage from '../../pages/MainPage';
import MessengerPageAsync from '../../pages/messenger/MessengerPageAsync';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProfilePageAsync from '../../pages/ProfilePage/ProfilePageAsync';
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
                path: SiteAppRoutePath[AppRoute.PROFILE],
                element: <ProfilePageAsync />,
            },
            {
                path: SiteAppRoutePath[AppRoute.MESSENGER],
                element: <MessengerPageAsync />,
                children: [
                    {
                        element: <ChatFeature />,
                        index: true,
                    },
                    {
                        element: <ChatMessageList />,
                        path: SiteAppRoutePath[AppRoute.MESSEGE],
                    },
                ],
            },
        ],
    },

    {
        path: SiteAppRoutePath[AppRoute.NOT_FOUND],
        element: <NotFoundPage />,
    },
]);
