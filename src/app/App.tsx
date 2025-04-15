import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import '../assets/styles.css';
import { AppRoutes } from './routes/AppRoutes';
import { store } from './store/store';

const App: FC = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={AppRoutes} />
            </Provider>
        </StrictMode>
    );
};

export default App;
