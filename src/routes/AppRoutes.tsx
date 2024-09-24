import { createBrowserRouter } from 'react-router-dom';
import { MenuLayout } from '../layouts/Menu/MenuLayout';

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MenuLayout />,
    },
]);
