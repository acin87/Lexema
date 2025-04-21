import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { clearCredentials, setCredentials } from '../slice/authSlice';
import { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest, TokenResponse } from '../types/AuthTypes';

/**
 * API для авторизации пользователя
 */
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        /**
         * Регистрация пользователя
         * @param credentials - данные для регистрации
         * @returns данные пользователя
         */
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (credentials) => ({
                url: API.REGISTRATION,
                method: 'POST',
                body: credentials,
            }),
        }),

        /**
         * Вход в систему
         * @param credentials - данные для входа
         * @returns токены
         */
        login: builder.mutation<TokenResponse, LoginRequest>({
            query: (credentials) => ({
                url: API.LOGIN,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (error) {
                    console.warn('Login failed:', error);
                }
            },
        }),

        /**
         * Выход из системы
         * @returns void
         */
        logout: builder.mutation<void, void>({
            query: () => ({
                url: API.LOGOUT,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearCredentials());
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            },
        }),

        /**
         * Обновление токена
         * @param refreshToken - токен для обновления
         * @returns токены
         */
        refreshToken: builder.mutation<TokenResponse, RefreshTokenRequest>({
            query: (refreshToken) => ({
                url: API.REFRESH,
                method: 'POST',
                body: { refreshToken },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    dispatch(clearCredentials());
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApi;
