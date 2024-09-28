import { createBrowserRouter } from 'react-router-dom';
import { MenuLayout } from '../layouts/Menu/MenuLayout';

import ErrorPage from '../pages/Error/ErrorPage';
import ContentWrapper from '../pages/Skeletons/ContentWrapper/ContentWrapper';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MenuLayout />,
        children: [
            {
                path: '/',
                element: <ContentWrapper />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
]);
