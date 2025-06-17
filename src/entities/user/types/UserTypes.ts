
export const USER_PERSISTENT_STATE = 'user';

export type UserState = {
    data: User;
};

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string | undefined | File;
    profile_image: string | undefined | File;
    is_staff: boolean;
    is_superuser: boolean;
    full_name: string;
    last_login: string | null;
};


//для поиска по пользователям
export type AutocompleteResponse = {
    results: Autocomplete[];
    count: number;
    previous: string | null;
    next: string | null;
};


export type Autocomplete = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    highlight: {
        first_name: string;
        last_name: string;
        username: string;
    };
};

