import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { LoginForm, LoginResponse, User, UserPersistentState, UserRequest, UsersResponse } from '../types/User';

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
        getAllFriends: builder.query<UsersResponse, UserRequest>({
            query: ({ limit, start = 0 }) => ({
                url: API.USERS,
                params: { _limit: limit, _start: start },
            }),
        }),
        getUserById: builder.query<User, { id: number | undefined }>({
            query: ({ id }) => ({
                url: `${API.USERS}/${id}`,
            }),
        }),
    }),
});
export const { useLoginUserMutation, useGetMeQuery, useGetAllFriendsQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery } = userApi;
