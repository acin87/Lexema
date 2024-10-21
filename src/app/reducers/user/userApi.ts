import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../api/api';
import { LoginForm, LoginResponse, UserPersistentState, User, UsersResponse } from './usersTypes';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: API.USER }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginForm>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: JSON.stringify({ username: data.username.value, password: data.password.value }),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Auth'],
        }),
        //registerUser: builder.mutation<>({})
        getMe: builder.query<LoginResponse, UserPersistentState>({
            query: (data) => ({
                url: 'auth/me',
                method: 'GET',
                headers: { Authorization: `Bearer ${data.jwt}` },
            }),
        }),
        getAllUsers: builder.query<UsersResponse, { limit: number; skip: number; select: string }>({
            query: ({ limit = 30, skip = 0, select = 'id,age,firstName,lastName' }) => ({
                url: 'users',
                params: { limit: limit, skip: skip, select: select },
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCacheData, newItems) => {
                const updatedData = [
                    ...currentCacheData.users.filter(
                        (existingItem) => !newItems.users.some((newItem) => newItem.id === existingItem.id)
                    ),
                    ...newItems.users,
                ];
                return {
                    users: updatedData,
                    limit: newItems.limit,
                    skip: newItems.skip,
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getUserById: builder.query<User, {id: number}>({
            query: ({id}) =>({
                url: `users/${id}`,
            })
        })
    }),
});
export const { useLoginUserMutation, useGetMeQuery, useGetAllUsersQuery, useGetUserByIdQuery } = userApi;
