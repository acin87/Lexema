export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};
