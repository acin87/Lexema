import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './app/routes/AppRoutes.tsx';

import { store } from './app/store/store.ts';
import './assets/reboot.css';
import './assets/styles-main.css';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={AppRoutes} />
    </Provider>
);
