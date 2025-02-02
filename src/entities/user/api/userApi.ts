import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { LoginForm, LoginResponse, User, UserPersistentState, UsersResponse } from '../types/User';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginForm>({
            query: (data) => ({
                url: API.LOGIN,
                method: 'POST',
                body: JSON.stringify({ username: data.username.value, password: data.password.value }),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Auth'],
        }),
        //registerUser: builder.mutation<>({})
        getMe: builder.query<LoginResponse, UserPersistentState>({
            query: (data) => ({
                url: `${API.ME}/me`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.jwt}` },
            }),
        }),
        getAllUsers: builder.query<UsersResponse, { limit: number; start: number }>({
            query: ({ limit = 30, start = 0 }) => ({
                url: API.USERS,
                params: { _limit: limit, _start: start },
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCacheData, newItems) => {
                const updatedData = [
                    ...currentCacheData.users.filter((existingItem) => !newItems.users.some((newItem) => newItem.id === existingItem.id)),
                    ...newItems.users,
                ];
                return {
                    users: updatedData,
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getUserById: builder.query<User, { id: number | undefined }>({
            query: ({ id }) => ({
                url: `${API.USERS}/${id}`,
            }),
        }),
    }),
});
export const { useLoginUserMutation, useGetMeQuery, useGetAllUsersQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery } = userApi;
