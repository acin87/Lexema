import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { useNotificationsWidget } from '../../features/notifications/hooks/useNotificationWidget';
const NotificationWidget = () => {
    const {
        notifications,
        groupedNotifications,
        getNotificationText,
        handleNotificationClick,
        handleFriendRequest,
        handleMarkAsRead,
    } = useNotificationsWidget();

    return (
        <Card>
            <CardHeader
                title={<Typography variant="body1">Уведомления</Typography>}
            ></CardHeader>
            <Divider />
            <CardContent>
                <List sx={{ width: '100%', maxWidth: 300 }}>
                    {notifications && notifications?.length > 1 ? (
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
                        })
                    ) : (
                        <ListItem>
                            <Typography>У вас нет уведомлений</Typography>
                        </ListItem>
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default NotificationWidget;
