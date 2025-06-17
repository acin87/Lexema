import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFriendActions from '../../friends/hooks/useFriendActions';
import { useMarkAsReadMutation } from '../api/notificationApi';
import { selectAllNotifications } from '../slice/notificationsSlice';
import { Notifications } from '../types/NotificationsTypes';

type NotificationsWithCount = Notifications & {
    count: number;
};

export const useNotificationsWidget = () => {
    const [open, setOpen] = useState(false);
    const notifications = useSelector(selectAllNotifications);
    const navigate = useNavigate();
    const [markAsRead] = useMarkAsReadMutation();
    const { handleAcceptFriendRequest, handleCancelFriendRequest } = useFriendActions();

    const handleMarkAsRead = useCallback(
        (notificationId: number) => {
            markAsRead({ id: notificationId });
        },
        [markAsRead],
    );

    const groupedNotifications = useMemo(() => {
        if (!notifications && !Array.isArray(notifications)) return [];
        return notifications?.reduce(
            (acc, notification) => {
                const key = `${notification.notification_type.code}_${notification.sender_info.id}`;
                if (!acc[key]) {
                    acc[key] = {
                        ...notification,
                        count: 1,
                    };
                } else {
                    acc[key].count += 1;
                }
                return acc;
            },
            {} as Record<string, NotificationsWithCount>,
        );
    }, [notifications]);

    const getNotificationText = useCallback((notification: NotificationsWithCount) => {
        const { notification_type, sender_info, count } = notification;

        if (count > 1 && notification_type.code === 'new_message') {
            return {
                text: `${notification_type.display} от ${sender_info.full_name}`,
                showCount: true,
                count,
            };
        }
        return {
            text: `${notification_type.display} от ${sender_info.full_name}`,
            showCount: false,
        };
    }, []);

    const handleNotificationClick = useCallback(
        (notification: NotificationsWithCount) => {
            if (notification.notification_type.code === 'new_message') {
                navigate(`/messenger/${notification.sender_info.id}`);
            }
            if (notification.notification_type.code === 'friend_request') {
                navigate(`/profile/${notification.sender_info.id}`);
            }
            setOpen(false);
        },
        [navigate],
    );

    const handleFriendRequest = useCallback(
        (type: 'accept' | 'cancel', friendshipId: number, notificationId: number) => {
            if (type === 'accept') {
                handleAcceptFriendRequest(friendshipId);
            } else {
                handleCancelFriendRequest(friendshipId);
            }
            handleMarkAsRead(notificationId);
            if (notifications?.length === 1) {
                setOpen(false);
            }
        },
        [handleAcceptFriendRequest, handleCancelFriendRequest, handleMarkAsRead, notifications],
    );

    return {
        open,
        setOpen,
        notifications,
        groupedNotifications,
        getNotificationText,
        handleNotificationClick,
        handleFriendRequest,
        handleMarkAsRead,
    };
};
