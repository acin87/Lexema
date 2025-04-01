import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePollingNotifications } from '../../features/notifications/hooks/usePollingNotifications';
import { setNotifications } from '../../features/notifications/slice/notificationsSlice';
import { NotificationsContext } from './NotificationsContext';
import { Notifications } from '../../features/notifications/types/NotificationsTypes';

interface NotificationsProviderProps {
    children: React.ReactNode;
}

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
    const { data } = usePollingNotifications();
    const dispatch = useDispatch();
    const [notificationsContext, setNotificationsContext] = useState<Notifications[]>();

    useEffect(() => {
        if (data) {
            dispatch(setNotifications(data));

            setNotificationsContext(data);
        }
    }, [data, dispatch]);

    return <NotificationsContext.Provider value={ notificationsContext }>{children}</NotificationsContext.Provider>;
};

export default NotificationsProvider;
