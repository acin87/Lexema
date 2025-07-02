import { User } from '../../../entities/user/types/UserTypes';

export type FriendsResponse = {
    results: Friend[];
    count: number;
    next: string;
    previous: string;
};
export type Friend = {
    friend_id: number;
    status: 'accepted' | 'pending' | 'rejected';
    status_data?: {
        code: number;
        name: string;
    };
    friendship_id?: number;
    friends_count: number;
    posts_count: number;
    groups_count: number;
    isFilledProfile: boolean;
    is_mutual: boolean;
    is_online: boolean;
    friend_friends_data?: [
        {
            id: number;
            full_name: string;
            avatar_image: string;
        },
    ];
} & User; // {full_name: string;}

export type MutualFriendsRespoonse = {
    friends: Friend[];
    stats: {
        total_friends: number;
        mutual_friends: number;
        online_friends: number;
    };
};

export type Images = {
    avatar_image?: string;
    main_page_image?: string;
};
export type FriendRequest = {
    limit: number;
    start: number;
    userId: number;
};
export type UpcomingBirthdaysResponse = {
    profile: UpcomingBirthdays;
};
export type UpcomingBirthdays = {
    user: { id: number; first_name: string; last_name: string; avatar_image?: string };
    birth_date: string;
    images: Images[];
};

export enum FriendStatus {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = 2,
}

export const FriendStatusName = {
    [FriendStatus.PENDING]: 'Отправлено',
    [FriendStatus.ACCEPTED]: 'Подтверждено',
    [FriendStatus.REJECTED]: 'Отклонено',
};
