
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
    full_name: string;
};

export type UserAutocompleteResponse = {
    results: UserAutocomplete[];
    count: number;
    previous: string | null;
    next: string | null;
};

export type UserAutocomplete = {
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

