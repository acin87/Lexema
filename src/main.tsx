import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './app/routes/AppRoutes.tsx';
import Store from './app/store/store.ts';
import './assets/default.css';
import './assets/reboot.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={Store}>
            <RouterProvider router={AppRoutes} />
        </Provider>
    </StrictMode>
);
