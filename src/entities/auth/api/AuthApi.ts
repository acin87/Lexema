import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { API, BASEURL } from '../../../app/api/ApiConfig';

import { RootState } from '../../../app/store/store';

import { clearCredentials, setCredentials } from '../slice/authSlice';
import { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest, TokenResponse } from '../types/AuthTypes';

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

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
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
        }),
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

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;
