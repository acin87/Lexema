import { User } from '../../friends/types/FriendTypes';


export type Profile = {
    id: number;
    user: User;
    age: number;
    gender: 'male' | 'female';
    phone: string;
    birthDate: string;
    address: string;
    education: string;
    company: string;
    images?: ProfileImages[];
    posts_count: number;
    friends_count: number;
    groups_count: number;
};

export type ProfileImages = {
    avatar_image?: string;
    main_page_image?: string;
};

export type UpcomingBirthdaysResponse = {
    results: Profile[];
};

export type FriendProfile = {
    profile: {
        user: User;
        images?: ProfileImages[];
    };
    friends_count: number;
    posts_count: number;
    groups_count: number;
    friend: number;
    friends_avatars: string[];
};

export type FriendsListResponse = {
    results: FriendProfile[];
    count: number;
    next: string | null;
    previous: string | null;
};

export type ProfilePostRequest = {
    id: number;
    limit: number;
    offset: number;
};

/**
 * [
    {
        "profile": {
            "user": {
                "id": 6,
                "first_name": "Лев",
                "last_name": "Толстой"
            },
            "images": [
                {
                    "avatar_image": "/media/users/images/img_6_f2ba22f869ac4abba30b27d419c59eb2.jpg",
                    "main_page_image": "/media/users/images/img_6_26ae8e09eb9f47c6af768cfc6e5c7f34.jpg"
                }
            ]
        },
        "friends_count": 0,
        "posts_count": 0,
        "groups_count": 0,
        "friend": 6,
        "friends_avatars": []
    }
]
 */
