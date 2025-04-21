import { useGetUnreadNotificationsQuery } from '../api/notificationApi';

export const usePollingNotifications = () => {
    return useGetUnreadNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        pollingInterval: 5000,
    });
};
