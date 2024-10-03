export type AuthSliceState = {
	jwt: string | null,
	loginErrorMsg?: string,
	registerErrorMsg?: string,
}

export type AuthPersistentState = {
	jwt: string | null
}

export type LoginForm ={
	authEmail:{
		value: string
	},
	authPassword:{
		value: string
	}
}