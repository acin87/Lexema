import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/Main/MainLayout';

import ContentWrapper from '../components/Skeletons/ContentWrapper/ContentWrapper';
import ErrorPage from '../pages/Error/ErrorPage';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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
