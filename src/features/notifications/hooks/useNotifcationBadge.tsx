import { useCallback, useContext, useEffect, useState } from 'react';
import { NotificationsContext } from '../../../app/provider/NotificationsContext';

/**
 * Хук для подсчета количества уведомлений
 * @param notificationsType- типы уведомлений
 */
const useNotificationsBadge = (notificationsType: string[]) => {
    const notifications = useContext(NotificationsContext);
    const [count, setCount] = useState(0);

    const chipNotifications = useCallback(() => {
        if (notifications && notifications.length === 0) {
            setCount(0);
            return null;
        }
        let count = 0;
        notifications?.map((notification) => {
            if (notificationsType.includes(notification.notification_type.code)) {
                count++;
            }
        });
        if (count === 0) return null;
        setCount(count);
    }, [notifications, notificationsType]);

    useEffect(() => {
        if (notifications) {
            chipNotifications();
        } else {
            setCount(0);
        }
    }, [notifications, chipNotifications]);

    return { count };
};

export default useNotificationsBadge;
