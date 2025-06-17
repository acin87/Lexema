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
    signature: string;
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

export interface GalleryResponse {
    count: number;
    results: GalleryItem[];
    meta: {
        image_count:{
            posts: number;
            comments: number;
            total: number;
        };
        requested_by: string;
        time_period: string;
    }
}
export interface GalleryItem {
    id: string;
    src: string;
    uploaded_at: string;
    uploaded_by: number,
    width: number;
    height: number;
    size: number;
    source_type: string;
    source_id: number;
    post_id: number;
}
