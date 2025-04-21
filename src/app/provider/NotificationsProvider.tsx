import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePollingNotifications } from '../../features/notifications/hooks/usePollingNotifications';
import { setNotifications } from '../../features/notifications/slice/notificationsSlice';
import { AppDispatch } from '../store/store';

interface NotificationsProviderProps {
    children: ReactNode;
}

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
    const { data } = usePollingNotifications();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (data) {
            dispatch(setNotifications(data));
        }
    }, [data, dispatch]);

    return children;
};

export default NotificationsProvider;
