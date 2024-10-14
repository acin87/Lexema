
export type LoginForm = {
    username: { value: string };
    password: { value: string };
};
export type LoginResponse = {
    accessToken: string,
	refreshToken: string,
	username: string
	email: string,
	firstName: string,
	lastName: string,
	gender: string,
	id: number,
	image: string,
};
export const JWT_PERSISTENT_STATE = 'userData';