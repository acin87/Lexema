import { User } from '../../../entities/user/types/UserTypes';
import { FriendStatus, Images } from '../../../features/friends/types/FriendTypes';

export type ProfileImages = {
    avatar_image?: string;
    main_page_image?: string;
};

export type Profile = User & {
    age: number;
    gender: 'male' | 'female';
    phone: string;
    birthDate: string;
    address: string;
    education: string;
    company: string;
    images?: Images;
    posts_count: number;
    friends_count: number;
    groups_count: number;
    friendship_id: number | null;
    is_friend: boolean;
    friend_status: {
        code: FriendStatus;
        name: string;
    } | null;
};
