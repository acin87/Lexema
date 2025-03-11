export type AuthResponse = {
    message: string;
};

export type TokenResponse = {
    user_id: number;
    is_stuff: boolean;
    is_superuser: boolean;
    access: string;
    refresh: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};
