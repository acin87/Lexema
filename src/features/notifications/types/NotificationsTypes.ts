export type Notifications = {
    id: number;
    created_at: string;
    notification_type: NotificationsType;
    message?: string;
    isRead: boolean;
    sender_info: {
        id: number;
        full_name: string;
        avatar: string;
    };
    extra_data: {
        message_preview?: string;
        status?: string;
        friendship_id: number;
    };
};

export type NotificationsType = {
    code: string;
    display: string;
};
