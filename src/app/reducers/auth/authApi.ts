import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../api/api';
import { LoginResponse, LoginForm } from './authTypes';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API.LOGIN }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginForm>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: JSON.stringify({ username: data.username.value, password: data.password.value }),
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
    }),
});
export const { useLoginUserMutation } = authApi;
