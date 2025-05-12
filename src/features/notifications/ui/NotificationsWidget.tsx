import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
    Badge,
    Box,
    ButtonGroup,
    Card,
    CardHeader,
    Chip,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Popover,
    Tooltip,
    Typography,
} from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFriendActions from '../../friends/hooks/useFriendActions';
import { useMarkAsReadMutation } from '../api/notificationApi';
import { selectAllNotifications } from '../slice/notificationsSlice';
import { Notifications } from '../types/NotificationsTypes';

type NotificationsWithCount = Notifications & {
    count: number;
};

const NotificationsWidget: FC = () => {
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
            return (
                <>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {notification_type.display} от {sender_info.full_name}
                    </Typography>
                    <Chip label={count} color="primary" size="small" />
                </>
            );
        }
        return (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {notification_type.display} от {sender_info.full_name}
            </Typography>
        );
    }, []);

    const actionType = useCallback(
        (notify: NotificationsWithCount) => {
            switch (notify.notification_type.code) {
                case 'friend_request':
                    return (
                        <ButtonGroup>
                            <IconButton
                                sx={{ marginLeft: 'auto', pr: 1 }}
                                onClick={() => {
                                    handleAcceptFriendRequest(notify.extra_data.friendship_id);
                                    handleMarkAsRead(notify.id);
                                    if (notifications?.length === 1) {
                                        setOpen(false);
                                    }
                                }}
                            >
                                <Tooltip title="Принять заявку в друзья">
                                    <PersonAddIcon color="primary" fontSize="small" />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                sx={{ marginLeft: 'auto', pr: 1 }}
                                onClick={() => {
                                    handleCancelFriendRequest(notify.extra_data.friendship_id);
                                    handleMarkAsRead(notify.id);
                                    if (notifications?.length === 1) {
                                        setOpen(false);
                                    }
                                }}
                            >
                                <Tooltip title="Отклонить заявку в друзья">
                                    <PersonRemoveIcon color="primary" fontSize="small" />
                                </Tooltip>
                            </IconButton>
                        </ButtonGroup>
                    );
                default:
                    return (
                        <IconButton
                            sx={{ marginLeft: 'auto', pr: 1 }}
                            onClick={() => {
                                handleMarkAsRead(notify.id);
                                if (notifications?.length === 1) {
                                    setOpen(false);
                                }
                            }}
                        >
                            <Tooltip title="Отметить как прочитанное">
                                <MarkUnreadChatAltIcon color="primary" fontSize="small" />
                            </Tooltip>
                        </IconButton>
                    );
            }
        },
        [handleMarkAsRead, handleAcceptFriendRequest, handleCancelFriendRequest, notifications],
    );

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {notifications && notifications.length > 0 && (
                <IconButton onClick={() => setOpen(true)}>
                    <Badge badgeContent={notifications?.length} color="primary">
                        <NotificationsIcon color="primary" />
                    </Badge>
                </IconButton>
            )}
            <Popover
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={() => setOpen(false)}
                sx={{ mt: '4.563rem' }}
            >
                <Card>
                    <CardHeader
                        title="Уведомления"
                        sx={{ backgroundColor: 'primary.main' }}
                        action={
                            <Badge
                                badgeContent={notifications?.length}
                                color="secondary"
                                sx={{ marginLeft: 'auto', marginRight: 1 }}
                            ></Badge>
                        }
                    />

                    <List>
                        {groupedNotifications &&
                            Object.values(groupedNotifications).map((notification: NotificationsWithCount) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{ padding: 0, '&:not(:last-child)': { borderBottom: '1px solid #e0e0e0' } }}
                                >
                                    <ListItemButton
                                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                        onClick={() => {
                                            if (notification.notification_type.code === 'new_message') {
                                                navigate(`/messenger/${notification.sender_info.id}`);
                                            }
                                            if (notification.notification_type.code === 'friend_request') {
                                                navigate(`/profile/${notification.sender_info.id}`);
                                            }
                                            setOpen(false);
                                        }}
                                    >
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(notification.created_at).toLocaleDateString()}
                                        </Typography>

                                        {getNotificationText(notification)}
                                    </ListItemButton>
                                    {actionType(notification)}
                                </ListItem>
                            ))}
                    </List>
                </Card>
            </Popover>
        </Box>
    );
};

export default NotificationsWidget;
