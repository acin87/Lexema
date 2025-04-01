export type Notifications={
    id:number;
    created_at:string;
    notification_type: NotificationsType;
    message?:string;
    isRead:boolean;
    sender_info:{
        id:number;
        full_name:string;
        avatar:string;
    };
    extra_data:{
        [key:string]:string|number|boolean|object|string[]
    }
}

export type NotificationsType={
    code:string;
    display:string;
}