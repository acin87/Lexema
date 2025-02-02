import { FC } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { store } from './store/store';
import '../assets/styles.css'
const App: FC = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={AppRoutes} />
        </Provider>
    );
};

export default App;
