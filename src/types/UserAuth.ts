/**
 * Интерфейс для авторизации и регистрации
 */
export type UserAuth = {
    id: number,
	email: string,
	passwordHash: string,
	name: string,
	phone: string
}