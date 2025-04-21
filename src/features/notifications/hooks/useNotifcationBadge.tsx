import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import { selectNotificationsByType } from '../slice/notificationsSlice';

/**
 * Хук для подсчета количества уведомлений
 * @param notificationsType - типы уведомлений
 */
const useNotificationsBadge = (notificationsType: string[]) => {
    const notifications = useSelector((state: RootState) => selectNotificationsByType(state, notificationsType));

    const count = useMemo(() => notifications?.length, [notifications]);

    return { count };
};

export default useNotificationsBadge;
