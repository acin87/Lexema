export type LoginForm = {
    username: { value: string };
    password: { value: string };
};
export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    id: number;
    image: string;
};
export type RegisterForm = {
    username: { value: string };
    password: { value: string };
    email: { value: string };
};
export interface UserPersistentState {
    jwt: string | null;
}

export type UsersResponse = {
    users: User[]
    limit?: number,
    skip?: number ,
    total?: number
}

export type User = {
    id: number;
    firstName?: string;
    lastName?: string;
    fullName?: string
    maidenName?: string;
    age?: number;
    gender?: 'male' | 'female';
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    birthDate?: string;
    image?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    eyeColor?: string;
    hair?: HairData;
    ip?: string;
    address?: Address;
    macAddress?: string;
    university?: string;
    bank?: BankDetails;
    company?: Company;
    ein?: string;
    ssn?: string;
    userAgent?: string;
    crypto?: CryptoDetails;
    role?: 'admin' | 'moderator' | 'user';
};

export type Address = {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
};

export type Coordinates = {
    lat: number;
    lng: number;
};

export type HairData = {
    color: string;
    type: string;
};

export type BankDetails = {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
};
export type Company = {
    department: string;
    name: string;
    title: string;
    address: Address;
};

export type CryptoDetails = {
    coin: string;
    wallet: string;
    network: string;
};

export const JWT_PERSISTENT_STATE = 'userData';
