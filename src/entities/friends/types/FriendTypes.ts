import { Profile } from '../../profile/types/ProfileTypes';

export type MeResponse = {
    first_name: string;
    last_name: string;
    id: number;
};

export type FriendsResponse = {
    results: Friend[];
    count: number;
    next: string;
    previous: string;
};
export type Friend = {
    id: number;
    profile: Profile | null;
    status: 'accepted' | 'pending' | 'rejected';
    created_at: string;
    updated_at: string;
    user: number;
    friend: number;
    friends_count: number;
    posts_count: number;
    groups_count: number;
    friends_avatars: User[];
};
export type User = {
    id: number;
    first_name: string;
    last_name: string;
    avatar_image?: string;
};
export type Images = {
    avatar_image?: string;
    main_page_image?: string;
};
export type UserRequest = {
    limit: number;
    start: number;
    userId: number;
};
export type UpcomingBirthdaysResponse = {
    profile: UpcomingBirthdays;
};
export type UpcomingBirthdays = {
    user: User;
    birth_date: string;
    images: Images[];
};
