
export const USER_PERSISTENT_STATE = 'user';

export type UserState = {
    data: User;
};

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
    is_staff: boolean;
    is_superuser: boolean;
};

