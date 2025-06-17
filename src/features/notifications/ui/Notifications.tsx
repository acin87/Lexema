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
import React, { memo } from 'react';
import { useNotificationsWidget } from '../hooks/useNotificationWidget';

export const Notifications: React.FC = () => {
    const {
        open,
        setOpen,
        notifications,
        groupedNotifications,
        getNotificationText,
        handleNotificationClick,
        handleFriendRequest,
        handleMarkAsRead,
    } = useNotificationsWidget();

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
                            />
                        }
                    />

                    <List>
                        {groupedNotifications &&
                            Object.values(groupedNotifications).map((notification) => {
                                const { text, showCount, count } = getNotificationText(notification);
                                return (
                                    <ListItem
                                        key={notification.id}
                                        sx={{
                                            padding: 0,
                                            '&:not(:last-child)': { borderBottom: '1px solid #e0e0e0' },
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(notification.created_at).toLocaleDateString()}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                            >
                                                {text}
                                                {showCount && <Chip label={count} color="primary" size="small" />}
                                            </Typography>
                                        </ListItemButton>
                                        {notification.notification_type.code === 'friend_request' ? (
                                            <ButtonGroup>
                                                <IconButton
                                                    sx={{ marginLeft: 'auto', pr: 1 }}
                                                    onClick={() =>
                                                        handleFriendRequest(
                                                            'accept',
                                                            notification.extra_data.friendship_id,
                                                            notification.id,
                                                        )
                                                    }
                                                >
                                                    <Tooltip title="Принять заявку в друзья">
                                                        <PersonAddIcon color="primary" fontSize="small" />
                                                    </Tooltip>
                                                </IconButton>
                                                <IconButton
                                                    sx={{ marginLeft: 'auto', pr: 1 }}
                                                    onClick={() =>
                                                        handleFriendRequest(
                                                            'cancel',
                                                            notification.extra_data.friendship_id,
                                                            notification.id,
                                                        )
                                                    }
                                                >
                                                    <Tooltip title="Отклонить заявку в друзья">
                                                        <PersonRemoveIcon color="primary" fontSize="small" />
                                                    </Tooltip>
                                                </IconButton>
                                            </ButtonGroup>
                                        ) : (
                                            <IconButton
                                                sx={{ marginLeft: 'auto', pr: 1 }}
                                                onClick={() => handleMarkAsRead(notification.id)}
                                            >
                                                <Tooltip title="Отметить как прочитанное">
                                                    <MarkUnreadChatAltIcon color="primary" fontSize="small" />
                                                </Tooltip>
                                            </IconButton>
                                        )}
                                    </ListItem>
                                );
                            })}
                    </List>
                </Card>
            </Popover>
        </Box>
    );
};

export default memo(Notifications);
