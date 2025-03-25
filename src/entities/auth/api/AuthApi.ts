import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { clearCredentials, setCredentials } from '../slice/authSlice';
import { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest, TokenResponse } from '../types/AuthTypes';

/**
 * Базовый запрос
 * @param headers - заголовки запроса
 * @param getState - функция для получения состояния
 */
const baseQuery = fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.access;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

/**
 * Базовый запрос с перезапросом токена
 * @param args - аргументы запроса
 * @param api - API
 * @param extraOptions - дополнительные опции
 */
export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401 && typeof args !== 'string' && args.url !== API.LOGIN) {
        console.warn('User is not authenticated. Refreshing token...');
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
            const refreshResult = await baseQuery(
                { url: API.REFRESH, method: 'POST', body: { refreshToken } },
                api,
                extraOptions,
            );
            if (refreshResult.data) {
                const data = refreshResult.data as TokenResponse;
                api.dispatch(setCredentials(data));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(clearCredentials());
            }
        } else {
            api.dispatch(clearCredentials());
        }
    }
    return result;
};

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
