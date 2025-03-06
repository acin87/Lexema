import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { API, BASEURL } from '../../../app/api/ApiConfig';

import { RootState } from '../../../app/store/store';

import { clearCredentials, setCredentials } from '../slice/AuthSlice';
import { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest } from '../types/AuthTypes';

const baseQuery = fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        // Попытка обновить токен
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
            const refreshResult = await baseQuery(
                { url: API.REFRESH, method: 'POST', body: { refreshToken } },
                api,
                extraOptions,
            );
            if (refreshResult.data) {
                // Сохраняем новые токены
                api.dispatch(setCredentials(refreshResult.data as AuthResponse));
                // Повторяем оригинальный запрос с новым токеном
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Если обновление токена не удалось, выходим из системы
                api.dispatch(clearCredentials());
            }
        } else {
            // Если refreshToken отсутствует, выходим из системы
            api.dispatch(clearCredentials());
        }
    }

    return result;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (credentials) => ({
                url: API.REGISTRATION,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (error) {
                    console.error('Registration failed:', error);
                }
            },
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
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
                    console.error('Login failed:', error);
                }
            },
        }),
        refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
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

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;
